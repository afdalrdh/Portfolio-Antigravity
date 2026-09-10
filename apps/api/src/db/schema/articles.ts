import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const articles = pgTable('articles', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    excerpt: text('excerpt'),
    content: text('content'),
    coverImageUrl: text('cover_image_url'),
    coverImageId: text('cover_image_id'),
    category: text('category').notNull().default('Tips'), // Layanan, Renovasi, Material, Desain, Konstruksi, Budget & Perencanaan, Project Story, Tips
    author: text('author').notNull().default('Arsi Karya Team'),
    publishedDate: timestamp('published_date').notNull().defaultNow(),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    published: boolean('published').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
