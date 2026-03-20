/**
 * aggregator.ts — Сервис агрегации и нормализации прайс-листов поставщиков
 *
 * Реализует:
 * 1. Нормализацию (матчинг/дедупликацию) — один SKU на все источники
 * 2. Динамическое ценообразование — автопереключение на следующего поставщика при отсутствии стока
 * 3. Фоновой CRON-синхронизации (запускается вне основного потока UI)
 */

import { query, execute, withTransaction } from '@/lib/db';

// ─────────────────────────────────────────────
// Типы
// ─────────────────────────────────────────────

export interface SupplierProduct {
  /** Внутренний ID поставщика */
  supplierId: number;
  /** Артикул по прайс-листу поставщика */
  supplierArticle: string;
  /** Бренд */
  brand: string;
  /** Название товара */
  name: string;
  /** Категория (tyre | rim | accessory) */
  category: 'tyre' | 'rim' | 'accessory';
  /** Цена поставщика, руб */
  price: number;
  /** Остаток, шт */
  stock: number;
  /** Срок доставки, дней */
  deliveryDays: number;
  /** Характеристики (JSON) */
  attributes: Record<string, string | number>;
}

export interface NormalizedProduct {
  /** Наш внутренний SKU */
  sku: string;
  brand: string;
  name: string;
  category: string;
  /** Стандартизованные характеристики */
  attributes: Record<string, string | number>;
  /** Массив предложений от поставщиков, отсортированных по цене */
  offers: SupplierOffer[];
  /** Лучшая цена (от доступного поставщика) */
  bestPrice: number;
  /** ID лучшего поставщика */
  bestSupplierId: number;
}

export interface SupplierOffer {
  supplierId: number;
  supplierName: string;
  price: number;
  stock: number;
  deliveryDays: number;
  isAvailable: boolean;
}

// ─────────────────────────────────────────────
// Нормализация ключей характеристик
// ─────────────────────────────────────────────

/**
 * Нормализует объект атрибутов шины/диска к стандартному виду.
 * Пример: { "section_width": "205" } → { sectionWidth: 205 }
 */
export function normalizeTyreAttributes(raw: Record<string, string | number>): Record<string, string | number> {
  const keyMap: Record<string, string> = {
    'section_width': 'sectionWidth',
    'width': 'sectionWidth',
    'w': 'sectionWidth',
    'aspect_ratio': 'aspectRatio',
    'profile': 'aspectRatio',
    'h': 'aspectRatio',
    'rim_diameter': 'rimDiameter',
    'diameter': 'rimDiameter',
    'd': 'rimDiameter',
    'load_index': 'loadIndex',
    'speed_index': 'speedIndex',
    'season': 'season',
  };

  return Object.entries(raw).reduce<Record<string, string | number>>((acc, [k, v]) => {
    const normalized = keyMap[k.toLowerCase()] ?? k;
    const numVal = Number(v);
    acc[normalized] = isNaN(numVal) ? v : numVal;
    return acc;
  }, {});
}

/**
 * Генерирует уникальный SKU для продукта на основе ключевых характеристик.
 * Формат: {brand}_{category}_{sectionWidth}_{aspectRatio}_{rimDiameter}
 */
export function generateSku(
  brand: string,
  category: string,
  attributes: Record<string, string | number>
): string {
  const parts = [
    brand.toUpperCase().replace(/\s+/g, '_'),
    category.toUpperCase(),
    attributes.sectionWidth ?? 'X',
    attributes.aspectRatio ?? 'X',
    attributes.rimDiameter ?? 'X',
  ];
  return parts.join('_');
}

// ─────────────────────────────────────────────
// Алгоритм матчинга (дедупликации)
// ─────────────────────────────────────────────

/**
 * Обрабатывает прайс-лист одного поставщика и сохраняет в MySQL.
 * Если SKU уже существует — обновляет оффер, иначе создаёт новую карточку.
 *
 * ВАЖНО: Выполняется в фоновом CRON-воркере, НЕ в HTTP-обработчике.
 */
export async function processSupplierPricelist(
  products: SupplierProduct[]
): Promise<{ created: number; updated: number; errors: number }> {
  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const product of products) {
    try {
      await withTransaction(async (conn: import('mysql2/promise').PoolConnection) => {
        const attrs = normalizeTyreAttributes(product.attributes);
        const sku = generateSku(product.brand, product.category, attrs);

        // Upsert карточки товара (master product)
        const [existing] = await conn.execute(
          'SELECT id FROM products WHERE sku = ?',
          [sku]
        );
        const rows = existing as { id: number }[];

        if (rows.length === 0) {
          // Создаём новую карточку
          await conn.execute(
            `INSERT INTO products (sku, brand, name, category, attributes, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [sku, product.brand, product.name, product.category, JSON.stringify(attrs)]
          );
          created++;
        }

        // Upsert оффера поставщика
        await conn.execute(
          `INSERT INTO supplier_offers
             (sku, supplier_id, supplier_article, price, stock, delivery_days, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, NOW())
           ON DUPLICATE KEY UPDATE
             price = VALUES(price),
             stock = VALUES(stock),
             delivery_days = VALUES(delivery_days),
             updated_at = NOW()`,
          [sku, product.supplierId, product.supplierArticle, product.price, product.stock, product.deliveryDays]
        );
        updated++;
      });
    } catch (err) {
      console.error(`[Aggregator] Error processing SKU for article ${product.supplierArticle}:`, err);
      errors++;
    }
  }

  return { created, updated, errors };
}

// ─────────────────────────────────────────────
// Динамическое ценообразование
// ─────────────────────────────────────────────

/**
 * Получить лучшее доступное предложение по SKU.
 * Алгоритм автоматически переключается на следующего поставщика,
 * если у текущего закончился сток.
 */
export async function getBestOffer(sku: string): Promise<SupplierOffer | null> {
  const offers = await query<SupplierOffer & { supplier_name: string }>(
    `SELECT
       so.supplier_id as supplierId,
       s.name as supplierName,
       so.price,
       so.stock,
       so.delivery_days as deliveryDays,
       (so.stock > 0) as isAvailable
     FROM supplier_offers so
     JOIN suppliers s ON s.id = so.supplier_id
     WHERE so.sku = ?
       AND so.stock > 0
     ORDER BY so.price ASC
     LIMIT 1`,
    [sku]
  );

  return offers[0] ?? null;
}

/**
 * Получить все офферы для карточки товара (для отображения на фронте).
 */
export async function getAllOffers(sku: string): Promise<SupplierOffer[]> {
  return query<SupplierOffer>(
    `SELECT
       so.supplier_id as supplierId,
       s.name as supplierName,
       so.price,
       so.stock,
       so.delivery_days as deliveryDays,
       (so.stock > 0) as isAvailable
     FROM supplier_offers so
     JOIN suppliers s ON s.id = so.supplier_id
     WHERE so.sku = ?
     ORDER BY so.price ASC`,
    [sku]
  );
}

/**
 * Поиск шин по параметрам (подготовлен под TecDoc-структуру).
 */
export async function searchTyres(params: {
  sectionWidth?: number;
  aspectRatio?: number;
  rimDiameter?: number;
  brand?: string;
  season?: string;
  limit?: number;
}): Promise<NormalizedProduct[]> {
  const conditions: string[] = ["p.category = 'tyre'"];
  const values: (string | number)[] = [];

  if (params.sectionWidth) {
    conditions.push("JSON_EXTRACT(p.attributes, '$.sectionWidth') = ?");
    values.push(params.sectionWidth);
  }
  if (params.aspectRatio) {
    conditions.push("JSON_EXTRACT(p.attributes, '$.aspectRatio') = ?");
    values.push(params.aspectRatio);
  }
  if (params.rimDiameter) {
    conditions.push("JSON_EXTRACT(p.attributes, '$.rimDiameter') = ?");
    values.push(params.rimDiameter);
  }
  if (params.brand) {
    conditions.push('p.brand LIKE ?');
    values.push(`%${params.brand}%`);
  }

  const sql = `
    SELECT
      p.sku,
      p.brand,
      p.name,
      p.category,
      p.attributes,
      MIN(so.price) as bestPrice,
      (SELECT supplier_id FROM supplier_offers WHERE sku = p.sku AND stock > 0 ORDER BY price ASC LIMIT 1) as bestSupplierId
    FROM products p
    LEFT JOIN supplier_offers so ON so.sku = p.sku AND so.stock > 0
    WHERE ${conditions.join(' AND ')}
    GROUP BY p.sku
    ORDER BY bestPrice ASC
    LIMIT ?
  `;
  values.push(params.limit ?? 50);

  const rows = await query<Omit<NormalizedProduct, 'offers'>>(sql, values);

  // Парсим JSON attributes
  return rows.map((row: Omit<NormalizedProduct, 'offers'> & { attributes: string | Record<string, string | number> }) => ({
    ...row,
    attributes: typeof row.attributes === 'string' ? JSON.parse(row.attributes) : row.attributes,
    offers: [], // Загружаем отдельно при необходимости
  }));
}
