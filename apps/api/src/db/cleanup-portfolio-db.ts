import 'dotenv/config';
import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL not set');
    process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: 'require' });

async function cleanupPortfolioDB() {
    console.log('🔄 Cleaning up Phase 4 tables from Portfolio Database...');

    // Drop tables created during Phase 4
    await sql`DROP TABLE IF EXISTS services CASCADE`;
    console.log('  ✓ Dropped services table');

    await sql`DROP TABLE IF EXISTS articles CASCADE`;
    console.log('  ✓ Dropped articles table');

    await sql`DROP TABLE IF EXISTS testimonials CASCADE`;
    console.log('  ✓ Dropped testimonials table');

    await sql`DROP TABLE IF EXISTS inquiries CASCADE`;
    console.log('  ✓ Dropped inquiries table');

    await sql`DROP TABLE IF EXISTS media CASCADE`;
    console.log('  ✓ Dropped media table');

    await sql`DROP TABLE IF EXISTS site_settings CASCADE`;
    console.log('  ✓ Dropped site_settings table');

    // Remove added columns from projects table
    await sql`
        ALTER TABLE projects
        DROP COLUMN IF EXISTS location,
        DROP COLUMN IF EXISTS client_context,
        DROP COLUMN IF EXISTS arsi_karya_role,
        DROP COLUMN IF EXISTS description,
        DROP COLUMN IF EXISTS scope,
        DROP COLUMN IF EXISTS process,
        DROP COLUMN IF EXISTS cover_image_id,
        DROP COLUMN IF EXISTS gallery,
        DROP COLUMN IF EXISTS published,
        DROP COLUMN IF EXISTS seo_title,
        DROP COLUMN IF EXISTS seo_description
    `;
    console.log('  ✓ Restored projects table columns in Portfolio DB');

    console.log('✅ Portfolio DB cleanup complete! Portfolio database restored to original state.');
    await sql.end();
}

cleanupPortfolioDB().catch((err) => {
    console.error('❌ Cleanup failed:', err);
    process.exit(1);
});
