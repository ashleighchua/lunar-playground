import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Lazy init: `neon()` throws if DATABASE_URL is unset, and Next.js evaluates
// top-level module code at build time, before Marketplace env vars exist on
// a fresh deploy. A plain lazy `let` (not a Proxy — Proxies break libraries
// that introspect the client object) keeps `next build` safe.
function createDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!_db) _db = createDb();
  return _db;
}
