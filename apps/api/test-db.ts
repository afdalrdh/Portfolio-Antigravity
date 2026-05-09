import postgres from 'postgres';
import fs from 'fs';

async function test() {
    const env = fs.readFileSync('.env', 'utf-8');
    const dbUrl = env.split('\n').find(l => l.startsWith('DATABASE_URL')).split('=')[1].trim();
    
    const sql = postgres(dbUrl);
    try {
        const res = await sql`
            SELECT column_name, data_type, character_maximum_length 
            FROM information_schema.columns 
            WHERE table_name = 'experiences';
        `;
        console.table(res);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sql.end();
    }
}
test();
