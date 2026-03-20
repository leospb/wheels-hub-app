/**
 * tecdoc.ts — Сервис запросов к API TECDOC 2025
 * Получение OE-параметров (шины, диски) по VIN и artNo.
 * https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint
 */

import { query } from '@/lib/db';

// ─────────────────────────────────────────────
// Конфигурация TECDOC API
// ─────────────────────────────────────────────

const TECDOC_API_URL = process.env.TECDOC_API_URL ?? 'https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint';
const TECDOC_API_KEY = process.env.TECDOC_API_KEY ?? '';
const TECDOC_PROVIDER_ID = Number(process.env.TECDOC_PROVIDER_ID ?? 0);

interface TecdocApiRequest {
  [key: string]: unknown;
}

async function tecdocFetch<T>(method: string, params: TecdocApiRequest): Promise<T> {
  const body = JSON.stringify({
    [`get${method}`]: {
      ...params,
      lang: 'ru',
      country: 'RU',
      provider: TECDOC_PROVIDER_ID,
    },
  });

  const response = await fetch(TECDOC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': TECDOC_API_KEY,
    },
    body,
    next: { revalidate: 3600 }, // Кэш 1 час
  });

  if (!response.ok) {
    throw new Error(`TecDoc API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// ─────────────────────────────────────────────
// Типы ответов
// ─────────────────────────────────────────────

export interface TecdocVehicle {
  carId: number;
  manuId: number;
  modId: number;
  /** Марка автомобиля */
  manuName: string;
  /** Модель / Серия */
  modelName: string;
  /** Тип кузова */
  typeName: string;
  yearFrom: number;
  yearTo: number | null;
  engineCode: string;
  powerKw: number;
}

export interface TecdocOeWheelSpec {
  /** Ширина профиля (мм) */
  sectionWidth: number;
  /** Высота профиля (%) */
  aspectRatio: number;
  /** Диаметр диска (дюймы) */
  rimDiameter: number;
  /** Вылет (мм) */
  offset: number;
  /** Ширина диска (дюймы) */
  rimWidth: number;
  /** PCD — круг болтов (мм) */
  pcd: string;
  /** Центральное отверстие (мм) */
  centerBore: number;
}

// ─────────────────────────────────────────────
// Основные функции сервиса
// ─────────────────────────────────────────────

/**
 * Поиск автомобиля по VIN.
 * Сначала ищем в локальном кэше MySQL, затем запрашиваем TecDoc API.
 */
export async function getVehicleByVin(vin: string): Promise<TecdocVehicle | null> {
  // 1. Проверяем локальный кэш
  const cached = await query<TecdocVehicle & { created_at: string }>(
    'SELECT * FROM tecdoc_vehicle_cache WHERE vin = ? AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)',
    [vin]
  );
  if (cached.length > 0) return cached[0];

  // 2. Запрашиваем API
  try {
    // TODO: Реализовать реальный endpoint TECDOC VIN-декодирования
    // const result = await tecdocFetch<{ vehicles: TecdocVehicle[] }>('VehiclesByVIN', { vin });
    // return result.vehicles[0] ?? null;

    // Заглушка для разработки
    console.warn('[TecDoc] VIN lookup stub — реальный API ещё не подключён');
    return null;
  } catch (error) {
    console.error('[TecDoc] getVehicleByVin error:', error);
    return null;
  }
}

/**
 * Получение OE-параметров колёс для конкретного автомобиля.
 * @param carId — ID автомобиля в базе TecDoc
 */
export async function getOeWheelSpecs(carId: number): Promise<TecdocOeWheelSpec[]> {
  // 1. Проверяем кэш
  const cached = await query<TecdocOeWheelSpec>(
    'SELECT * FROM tecdoc_wheel_specs WHERE car_id = ?',
    [carId]
  );
  if (cached.length > 0) return cached;

  // 2. Запрашиваем API (заглушка)
  try {
    // TODO: Реальный запрос к TECDOC getTyresList
    console.warn('[TecDoc] getOeWheelSpecs stub — реальный API ещё не подключён');

    // Возвращаем дефолтные параметры для демо
    return [{
      sectionWidth: 205,
      aspectRatio: 55,
      rimDiameter: 16,
      offset: 45,
      rimWidth: 6.5,
      pcd: '5x112',
      centerBore: 57.1,
    }];
  } catch (error) {
    console.error('[TecDoc] getOeWheelSpecs error:', error);
    return [];
  }
}

/**
 * Полный пайплайн: VIN → Vehicle → OE Specs
 */
export async function getOeSpecsByVin(vin: string): Promise<TecdocOeWheelSpec | null> {
  const vehicle = await getVehicleByVin(vin);
  if (!vehicle) return null;
  const specs = await getOeWheelSpecs(vehicle.carId);
  return specs[0] ?? null;
}
