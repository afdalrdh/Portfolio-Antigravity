import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema/index.js';

const defaultDbUrl = 'postgresql://neondb_owner:npg_bG2KeJ8uhkQC@ep-withered-cell-aogfre95.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const rawUrl = process.env.DATABASE_URL;

// Ensure we use the active production branch URL ep-withered-cell-aogfre95 and sanitize -pooler
let connectionString = (rawUrl && rawUrl.includes('neon.tech')) ? rawUrl : defaultDbUrl;
connectionString = connectionString.replace('-pooler.', '.');

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

