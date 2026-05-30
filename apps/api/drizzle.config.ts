import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from the api directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    out: path.resolve(__dirname, './drizzle'),
    schema: path.join(__dirname, 'src', 'db', 'schema', '*.ts').replace(/\\/g, '/'),
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
