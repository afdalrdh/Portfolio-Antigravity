
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
