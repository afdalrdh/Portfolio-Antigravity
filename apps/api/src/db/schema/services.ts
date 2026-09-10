import { pgTable, serial, text, integer, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

export const services = pgTable('services', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    shortDescription: text('short_description'),
    description: text('description'),
    scope: jsonb('scope').$type<string[]>(),
    process: jsonb('process').$type<{ title: string; description: string }[]>(),
    faq: jsonb('faq').$type<{ question: string; answer: string }[]>(),
    heroImageUrl: text('hero_image_url'),
    heroImageId: text('hero_image_id'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    published: boolean('published').notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
