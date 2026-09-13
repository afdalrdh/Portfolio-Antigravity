import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const creations = pgTable('creations', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    imageUrl: text('image_url').notNull(),
    category: text('category').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
