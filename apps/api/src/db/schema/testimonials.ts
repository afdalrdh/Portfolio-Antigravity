import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const testimonials = pgTable('testimonials', {
    id: serial('id').primaryKey(),
    clientName: text('client_name').notNull(),
    clientRole: text('client_role'),
    quote: text('quote').notNull(),
    projectName: text('project_name'),
    imageUrl: text('image_url'),
    imageId: text('image_id'),
    approved: boolean('approved').notNull().default(false),
    published: boolean('published').notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
