/**
 * db.ts — Конфигурация пула подключений к MySQL
 * Все запросы используют prepared statements (защита от SQL-инъекций).
 * Архитектура оптимизирована под базы TECDOC.
 */

import mysql from 'mysql2/promise';

// ─────────────────────────────────────────────
// Конфигурация пула
// ─────────────────────────────────────────────

const poolConfig: mysql.PoolOptions = {
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER ?? 'root',
  password: process.env.MYSQL_PASSWORD ?? '',
  database: process.env.MYSQL_DATABASE ?? 'wheels_hub',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  timezone: '+03:00',
  charset: 'UTF8MB4_UNICODE_CI',
};

// ─────────────────────────────────────────────
// Синглтон пула (важно для Next.js hot reload)
// ─────────────────────────────────────────────

declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool: mysql.Pool | undefined;
}

function createPool(): mysql.Pool {
  const pool = mysql.createPool(poolConfig);

  pool.on('connection', (connection) => {
    console.log('[MySQL] New connection established, id:', connection.threadId);
  });

  return pool;
}

/**
 * Получить пул соединений MySQL.
 * В dev-режиме переиспользуем глобальный инстанс (hot reload safe).
 */
export function getPool(): mysql.Pool {
  if (process.env.NODE_ENV === 'development') {
    if (!global.__mysqlPool) {
      global.__mysqlPool = createPool();
    }
    return global.__mysqlPool;
  }
  return createPool();
}

// ─────────────────────────────────────────────
// Хелперы
// ─────────────────────────────────────────────

/**
 * Выполнить SELECT-запрос с prepared statement.
 * @example
 * const rows = await query<ProductRow>('SELECT * FROM products WHERE id = ?', [id]);
 */
export async function query<T>(
  sql: string,
  params: (string | number | boolean | null)[] = []
): Promise<T[]> {
  const pool = getPool();
  const [rows] = await pool.execute<mysql.RowDataPacket[]>(sql, params);
  return rows as T[];
}

/**
 * Выполнить INSERT/UPDATE/DELETE с prepared statement.
 * Возвращает ResultSetHeader (insertId, affectedRows).
 */
export async function execute(
  sql: string,
  params: (string | number | boolean | null)[] = []
): Promise<mysql.ResultSetHeader> {
  const pool = getPool();
  const [result] = await pool.execute<mysql.ResultSetHeader>(sql, params);
  return result;
}

/**
 * Выполнить несколько запросов в транзакции.
 */
export async function withTransaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const pool = getPool();
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
