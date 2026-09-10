import { pgTable, serial, text, integer, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    category: text('category'),
    slug: text('slug').notNull().unique(),
    company: text('company'),
    location: text('location'),
    year: text('year'),
    clientContext: text('client_context'),
    arsiKaryaRole: text('arsi_karya_role'),
    description: text('description'),
    scope: text('scope'),
    process: text('process'),
    liveLink: text('live_link'),
    coverImageUrl: text('cover_image_url'),
    coverImageId: text('cover_image_id'),
    gallery: jsonb('gallery').$type<any[]>(),
    published: boolean('published').notNull().default(true),
    visibility: text('visibility').notNull().default('public'), // 'public' | 'draft' | 'private'
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const projectBlocks = pgTable('project_blocks', {
    id: serial('id').primaryKey(),
    projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
    type: text('type').notNull(), // 'narrative' | 'image_main' | 'image_grid' | 'design_system'
    sortOrder: integer('sort_order').notNull().default(0),
    title: text('title'),
    text: text('text'),
    imageUrl: text('image_url'),
    imageUrl2: text('image_url2'),
    fontFamily: text('font_family'),
    colors: jsonb('colors').$type<string[]>(),
});
