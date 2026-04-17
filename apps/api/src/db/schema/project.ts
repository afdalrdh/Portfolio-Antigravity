import { pgTable, serial, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    company: text('company'),
    year: text('year'),
    liveLink: text('live_link'),
    coverImageUrl: text('cover_image_url'),
    visibility: text('visibility').notNull().default('draft'), // 'public' | 'draft' | 'private'
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
