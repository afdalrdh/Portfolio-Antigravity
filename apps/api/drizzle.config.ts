import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from the api directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    out: path.resolve(__dirname, './drizzle'),
    schema: path.resolve(__dirname, './src/db/schema/index.ts'),
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
