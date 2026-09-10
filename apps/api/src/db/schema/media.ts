import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const media = pgTable('media', {
    id: serial('id').primaryKey(),
    publicId: text('public_id').notNull().unique(),
    url: text('url').notNull(),
    secureUrl: text('secure_url'),
    format: text('format'),
    width: integer('width'),
    height: integer('height'),
    bytes: integer('bytes'),
    folder: text('folder'),
    altText: text('alt_text'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
