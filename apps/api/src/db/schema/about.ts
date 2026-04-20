import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const aboutPage = pgTable('about_page', {
    id: serial('id').primaryKey(),
    bioDescription: text('bio_description'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const aboutTools = pgTable('about_tools', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    iconCode: text('icon_code').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
});

export const experiences = pgTable('experiences', {
    id: serial('id').primaryKey(),
    logoUrl: text('logo_url').default(''),
    title: text('title').notNull(),
    company: text('company').notNull(),
    dateStart: text('date_start').notNull(),
    dateEnd: text('date_end').notNull().default('Present'),
    contractType: text('contract_type').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
});

export const certifications = pgTable('certifications', {
    id: serial('id').primaryKey(),
    logoUrl: text('logo_url').default(''),
    title: text('title').notNull(),
    issuer: text('issuer').notNull(),
    dateStart: text('date_start').notNull(),
    dateEnd: text('date_end').default(''),
    sortOrder: integer('sort_order').notNull().default(0),
});

export const galleryImages = pgTable('gallery_images', {
    id: serial('id').primaryKey(),
    imageUrl: text('image_url').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
});
