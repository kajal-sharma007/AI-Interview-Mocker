import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const dbUrl = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL || 'default_database_url';
const sql = neon(dbUrl);
export const db = drizzle(sql,{schema});

