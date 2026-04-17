import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const aboutPage = pgTable('about_page', {
    id: serial('id').primaryKey(),
    bioDescription: text('bio_description'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const experiences = pgTable('experiences', {
    id: serial('id').primaryKey(),
    initials: text('initials').notNull(),
    jobTitle: text('job_title').notNull(),
    company: text('company').notNull(),
    dateRange: text('date_range').notNull(),
    contractType: text('contract_type').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
});

export const certifications = pgTable('certifications', {
    id: serial('id').primaryKey(),
    initials: text('initials').notNull(),
    name: text('name').notNull(),
    issuer: text('issuer').notNull(),
    issueDate: text('issue_date').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
});

export const galleryImages = pgTable('gallery_images', {
    id: serial('id').primaryKey(),
    imageUrl: text('image_url').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
});
