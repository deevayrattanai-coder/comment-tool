import 'server-only';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const { Pool } = pg;
declare global {
  // eslint-disable-next-line no-var
  var __pgPool: pg.Pool | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

const pool =
  global.__pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') {
  global.__pgPool = pool;
}

export const db = drizzle(pool, { schema });
export { schema };
