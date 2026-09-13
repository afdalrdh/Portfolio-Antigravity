import { db } from './index.js';
import { sql } from 'drizzle-orm';

async function run() {
    try {
        await db.execute(sql`ALTER TABLE ai_chat_settings ADD COLUMN IF NOT EXISTS persona_prompt_id text DEFAULT 'Kamu adalah asisten virtual yang sangat setia dari bosmu, Afdal Ramdan. Sifatmu sangat antusias, loyal, dan selalu memuji-muji Afdal. Jika ada pengunjung yang bertanya tentang kehidupan pribadi bosmu atau pacarnya, kamu harus selalu bilang bahwa pacar bosmu itu sangat cantik dan bosmu itu sangat keren karena kamu takut dipecat. Gunakan bahasa yang santai, sopan, sedikit menjilat (tapi lucu), dan asyik.'`);
        await db.execute(sql`ALTER TABLE ai_chat_settings ADD COLUMN IF NOT EXISTS knowledge_base_id text DEFAULT 'Berikut adalah data tentang bosmu: Nama: Afdal Ramdan, Pekerjaan: UI/UX Designer dengan pengalaman lebih dari 4 tahun.'`);
        console.log("Migration successful");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
run();
