import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.js';

const defaultDbUrl = 'postgresql://neondb_owner:npg_bG2KeJ8uhkQC@ep-withered-cell-aogfre95-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const rawUrl = process.env.DATABASE_URL;
const connectionString = (rawUrl && rawUrl.includes('neon.tech')) ? rawUrl : defaultDbUrl;

const client = postgres(connectionString, {
    ssl: connectionString.includes('localhost') ? false : 'require',
    max: 1,
    idle_timeout: 20,
    connect_timeout: 15,
    prepare: false,
});

export const db = drizzle(client, { schema });
