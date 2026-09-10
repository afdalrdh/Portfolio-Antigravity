import 'dotenv/config';
import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL not set');
    process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: 'require' });

async function migrate() {
    console.log('🔄 Running V4 migration for Arsi Karya Neon Database...');

    // 0. Auth tables for better-auth
    await sql`
        CREATE TABLE IF NOT EXISTS "user" (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            email_verified BOOLEAN NOT NULL DEFAULT false,
            image TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `;
    await sql`
        CREATE TABLE IF NOT EXISTS "session" (
            id TEXT PRIMARY KEY,
            expires_at TIMESTAMP NOT NULL,
            token TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            ip_address TEXT,
            user_agent TEXT,
            user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
        )
    `;
    await sql`
        CREATE TABLE IF NOT EXISTS "account" (
            id TEXT PRIMARY KEY,
            account_id TEXT NOT NULL,
            provider_id TEXT NOT NULL,
            user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
            access_token TEXT,
            refresh_token TEXT,
            id_token TEXT,
            access_token_expires_at TIMESTAMP,
            refresh_token_expires_at TIMESTAMP,
            scope TEXT,
            password TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `;
    console.log('  ✓ Better-Auth tables ensured');

    // 1. Projects table
    await sql`
        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT,
            slug TEXT NOT NULL UNIQUE,
            company TEXT,
            location TEXT,
            year TEXT,
            client_context TEXT,
            arsi_karya_role TEXT,
            description TEXT,
            scope TEXT,
            process TEXT,
            live_link TEXT,
            cover_image_url TEXT,
            cover_image_id TEXT,
            gallery JSONB,
            published BOOLEAN NOT NULL DEFAULT true,
            visibility TEXT NOT NULL DEFAULT 'public',
            seo_title TEXT,
            seo_description TEXT,
            sort_order INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `;
    console.log('  ✓ projects table ensured');

    // 2. Services table
    await sql`
        CREATE TABLE IF NOT EXISTS services (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            short_description TEXT,
            description TEXT,
            scope JSONB,
            process JSONB,
            faq JSONB,
            hero_image_url TEXT,
            hero_image_id TEXT,
            seo_title TEXT,
            seo_description TEXT,
            published BOOLEAN NOT NULL DEFAULT true,
            sort_order INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `;
    console.log('  ✓ services table ensured');

    // 3. Articles table
    await sql`
        CREATE TABLE IF NOT EXISTS articles (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            excerpt TEXT,
            content TEXT,
            cover_image_url TEXT,
            cover_image_id TEXT,
            category TEXT NOT NULL DEFAULT 'Tips',
            author TEXT NOT NULL DEFAULT 'Arsi Karya Team',
            published_date TIMESTAMP NOT NULL DEFAULT NOW(),
            seo_title TEXT,
            seo_description TEXT,
            published BOOLEAN NOT NULL DEFAULT false,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `;
    console.log('  ✓ articles table ensured');

    // 4. Testimonials table
    await sql`
        CREATE TABLE IF NOT EXISTS testimonials (
            id SERIAL PRIMARY KEY,
            client_name TEXT NOT NULL,
            client_role TEXT,
            quote TEXT NOT NULL,
            project_name TEXT,
            image_url TEXT,
            image_id TEXT,
            approved BOOLEAN NOT NULL DEFAULT false,
            published BOOLEAN NOT NULL DEFAULT false,
            sort_order INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `;
    console.log('  ✓ testimonials table ensured');

    // 5. Inquiries table
    await sql`
        CREATE TABLE IF NOT EXISTS inquiries (
            id SERIAL PRIMARY KEY,
            nama TEXT NOT NULL,
            perusahaan TEXT,
            email TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            jenis_kerjasama TEXT,
            jenis_proyek TEXT,
            lokasi TEXT,
            budget TEXT,
            pesan TEXT,
            source_page TEXT DEFAULT '/kontak',
            status TEXT NOT NULL DEFAULT 'new',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `;
    console.log('  ✓ inquiries table ensured');

    // 6. Media table
    await sql`
        CREATE TABLE IF NOT EXISTS media (
            id SERIAL PRIMARY KEY,
            public_id TEXT NOT NULL UNIQUE,
            url TEXT NOT NULL,
            secure_url TEXT,
            format TEXT,
            width INTEGER,
            height INTEGER,
            bytes INTEGER,
            folder TEXT,
            alt_text TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `;
    console.log('  ✓ media table ensured');

    // 7. Site settings table
    await sql`
        CREATE TABLE IF NOT EXISTS site_settings (
            id SERIAL PRIMARY KEY,
            company_name TEXT DEFAULT 'PT ARSI KARYA UNGGUL',
            tagline TEXT DEFAULT 'Membangun Tuntas, Unggul Dalam Kualitas',
            phone TEXT DEFAULT '+62 899-7932-802',
            whatsapp TEXT DEFAULT '+62 899-7932-802',
            email TEXT DEFAULT 'arsikaryaunggul@gmail.com',
            address TEXT DEFAULT 'Bumi Adipura, Jl. Tulip VII No. 21, Rancabolang, Gedebage, Kota Bandung.',
            instagram TEXT DEFAULT 'arsikarya.build',
            logo_url TEXT,
            seo_title TEXT DEFAULT 'PT ARSI KARYA UNGGUL — Kontraktor & Design Build',
            seo_description TEXT DEFAULT 'Kontraktor spesialis Konstruksi, Design & Build, Fabrikasi, dan Pengadaan Barang.',
            social_image_url TEXT,
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `;
    
    // Seed initial site_settings if empty
    const existingSettings = await sql`SELECT id FROM site_settings LIMIT 1`;
    if (existingSettings.length === 0) {
        await sql`
            INSERT INTO site_settings (
                company_name, tagline, phone, whatsapp, email, address, instagram, seo_title, seo_description
            ) VALUES (
                'PT ARSI KARYA UNGGUL',
                'Membangun Tuntas, Unggul Dalam Kualitas',
                '+62 899-7932-802',
                '+62 899-7932-802',
                'arsikaryaunggul@gmail.com',
                'Bumi Adipura, Jl. Tulip VII No. 21, Rancabolang, Gedebage, Kota Bandung.',
                'arsikarya.build',
                'PT ARSI KARYA UNGGUL — Kontraktor & Design Build',
                'Kontraktor spesialis Konstruksi, Design & Build, Fabrikasi, dan Pengadaan Barang.'
            )
        `;
        console.log('  ✓ initial site_settings row seeded');
    }

    // 8. Ensure initial admin user
    const existingUser = await sql`SELECT id FROM "user" WHERE email = 'admin@admin.com' LIMIT 1`;
    if (existingUser.length === 0) {
        const userId = 'admin-user-id-' + Date.now();
        await sql`
            INSERT INTO "user" (id, name, email, email_verified)
            VALUES (${userId}, 'Admin Arsi Karya', 'admin@admin.com', true)
        `;
        // Create account with hashed password for better-auth (or plain test hash)
        // better-auth password hash format or auth creation:
        const accountId = 'admin-account-id-' + Date.now();
        // create password hash or standard seed password
        await sql`
            INSERT INTO "account" (id, account_id, provider_id, user_id, password)
            VALUES (${accountId}, ${userId}, 'credential', ${userId}, 'admin123')
        `;
        console.log('  ✓ Admin user created: admin@admin.com');
    }

    console.log('✅ Arsi Karya Neon Database migration complete!');
    await sql.end();
}

migrate().catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
});
