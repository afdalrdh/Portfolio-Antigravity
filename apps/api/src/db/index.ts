import 'dotenv/config';
import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import { fileURLToPath } from 'url';
import path from 'path';
import * as schema from './schema/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../../local-db');

const client = new PGlite(dbPath);

export const db = drizzle(client, { schema });
