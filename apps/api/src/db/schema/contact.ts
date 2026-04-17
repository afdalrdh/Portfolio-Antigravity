import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const contactPage = pgTable('contact_page', {
    id: serial('id').primaryKey(),
    whatsappNumber: text('whatsapp_number'),
    defaultMessage: text('default_message'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
