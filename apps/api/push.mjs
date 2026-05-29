// Script to migrate schema using PGlite
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiDir = __dirname;

console.log('Generating migrations with drizzle-kit...');
execSync(`npx drizzle-kit generate --config=${path.join(apiDir, 'drizzle.config.ts')}`, {
    cwd: apiDir,
    stdio: 'inherit',
    env: {
        ...process.env,
    },
});

console.log('Applying migrations to PGlite database...');
// We need to run a small script to migrate
import fs from 'fs';
const runMigrateScript = path.join(apiDir, 'run-migrate.mjs');
fs.writeFileSync(runMigrateScript, `
import { migrate } from 'drizzle-orm/pglite/migrator';
import { db } from './src/db/index.js';

async function main() {
    console.log('Running Drizzle ORM migrate...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migration complete!');
    process.exit(0);
}
main().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
`);

execSync(`node --import tsx ${runMigrateScript}`, {
    cwd: apiDir,
    stdio: 'inherit',
});

