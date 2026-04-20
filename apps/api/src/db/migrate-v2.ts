import 'dotenv/config';
import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL not set');
    process.exit(1);
}

const sql = postgres(DATABASE_URL);

async function migrate() {
    console.log('🔄 Running V2 migration...');

    // 1. Create about_tools table if not exists
    await sql`
        CREATE TABLE IF NOT EXISTS about_tools (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            icon_code TEXT NOT NULL,
            sort_order INTEGER NOT NULL DEFAULT 0
        )
    `;
    console.log('  ✓ about_tools table ensured');

    // 2. Handle experiences table column migration
    // Add new columns if they don't exist
    const expCols = await sql`
        SELECT column_name FROM information_schema.columns
        WHERE table_name = 'experiences'
    `;
    const expColNames = expCols.map((r: any) => r.column_name);

    if (!expColNames.includes('logo_url')) {
        await sql`ALTER TABLE experiences ADD COLUMN logo_url TEXT DEFAULT ''`;
        console.log('  ✓ Added logo_url to experiences');
    }
    if (!expColNames.includes('title')) {
        if (expColNames.includes('job_title')) {
            await sql`ALTER TABLE experiences RENAME COLUMN job_title TO title`;
            console.log('  ✓ Renamed job_title → title in experiences');
        } else {
            await sql`ALTER TABLE experiences ADD COLUMN title TEXT NOT NULL DEFAULT ''`;
            console.log('  ✓ Added title to experiences');
        }
    }
    if (!expColNames.includes('date_start')) {
        if (expColNames.includes('date_range')) {
            // Split date_range into date_start and date_end
            await sql`ALTER TABLE experiences ADD COLUMN date_start TEXT NOT NULL DEFAULT ''`;
            await sql`ALTER TABLE experiences ADD COLUMN date_end TEXT NOT NULL DEFAULT 'Present'`;
            await sql`ALTER TABLE experiences ADD COLUMN contract_type TEXT NOT NULL DEFAULT ''`;
            console.log('  ✓ Added date_start, date_end, contract_type to experiences');
            // Drop old column
            await sql`ALTER TABLE experiences DROP COLUMN IF EXISTS date_range`;
            console.log('  ✓ Dropped old date_range from experiences');
        } else {
            await sql`ALTER TABLE experiences ADD COLUMN date_start TEXT NOT NULL DEFAULT ''`;
            console.log('  ✓ Added date_start to experiences');
        }
    }
    if (!expColNames.includes('date_end')) {
        await sql`ALTER TABLE experiences ADD COLUMN date_end TEXT NOT NULL DEFAULT 'Present'`;
        console.log('  ✓ Added date_end to experiences');
    }
    if (!expColNames.includes('contract_type')) {
        await sql`ALTER TABLE experiences ADD COLUMN contract_type TEXT NOT NULL DEFAULT ''`;
        console.log('  ✓ Added contract_type to experiences');
    }
    // Drop old columns that are no longer needed
    await sql`ALTER TABLE experiences DROP COLUMN IF EXISTS initials`;
    await sql`ALTER TABLE experiences DROP COLUMN IF EXISTS job_title`;

    // 3. Handle certifications table column migration
    const certCols = await sql`
        SELECT column_name FROM information_schema.columns
        WHERE table_name = 'certifications'
    `;
    const certColNames = certCols.map((r: any) => r.column_name);

    if (!certColNames.includes('logo_url')) {
        await sql`ALTER TABLE certifications ADD COLUMN logo_url TEXT DEFAULT ''`;
        console.log('  ✓ Added logo_url to certifications');
    }
    if (!certColNames.includes('title')) {
        if (certColNames.includes('name')) {
            await sql`ALTER TABLE certifications RENAME COLUMN name TO title`;
            console.log('  ✓ Renamed name → title in certifications');
        } else {
            await sql`ALTER TABLE certifications ADD COLUMN title TEXT NOT NULL DEFAULT ''`;
            console.log('  ✓ Added title to certifications');
        }
    }
    if (!certColNames.includes('date_start')) {
        if (certColNames.includes('issue_date')) {
            await sql`ALTER TABLE certifications RENAME COLUMN issue_date TO date_start`;
            console.log('  ✓ Renamed issue_date → date_start in certifications');
        } else {
            await sql`ALTER TABLE certifications ADD COLUMN date_start TEXT NOT NULL DEFAULT ''`;
            console.log('  ✓ Added date_start to certifications');
        }
    }
    if (!certColNames.includes('date_end')) {
        await sql`ALTER TABLE certifications ADD COLUMN date_end TEXT DEFAULT ''`;
        console.log('  ✓ Added date_end to certifications');
    }
    // Drop old columns
    await sql`ALTER TABLE certifications DROP COLUMN IF EXISTS initials`;
    await sql`ALTER TABLE certifications DROP COLUMN IF EXISTS name`;
    await sql`ALTER TABLE certifications DROP COLUMN IF EXISTS issue_date`;

    console.log('✅ V2 migration complete!');
    await sql.end();
}

migrate().catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
});
