import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const homePage = pgTable('home_page', {
    id: serial('id').primaryKey(),
    profileImageUrl: text('profile_image_url'),
    heroHeadline: text('hero_headline'),
    ctaText: text('cta_text'),
    ctaUrl: text('cta_url'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const socialLinks = pgTable('social_links', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    url: text('url').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
});
