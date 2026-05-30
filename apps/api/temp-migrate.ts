import 'dotenv/config';
import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';

async function run() {
    try {
        await db.execute(sql`ALTER TABLE contact_page ADD COLUMN email text;`);
        console.log('Added email');
    } catch(e: any) { console.error('email err:', e.message) }
    try {
        await db.execute(sql`ALTER TABLE contact_page ADD COLUMN phone text;`);
        console.log('Added phone');
    } catch(e: any) { console.error('phone err:', e.message) }
    try {
        await db.execute(sql`ALTER TABLE contact_page ADD COLUMN location text;`);
        console.log('Added location');
    } catch(e: any) { console.error('location err:', e.message) }
    process.exit(0);
}
run();
