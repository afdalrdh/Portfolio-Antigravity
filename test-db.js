import { Client } from 'pg';
import fs from 'fs';

async function test() {
    const env = fs.readFileSync('apps/api/.env', 'utf-8');
    const dbUrl = env.split('\n').find(l => l.startsWith('DATABASE_URL')).split('=')[1].trim();
    console.log('Connecting to:', dbUrl);
    
    const client = new Client({ connectionString: dbUrl });
    try {
        await client.connect();
        const res = await client.query(`
            SELECT column_name, data_type, character_maximum_length 
            FROM information_schema.columns 
            WHERE table_name = 'experiences';
        `);
        console.table(res.rows);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}
test();
