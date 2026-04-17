import { db } from '../db/index.js';
import { contactPage } from '../db/schema/contact.js';
import { eq } from 'drizzle-orm';

export const contactService = {
    async getContactPage() {
        const [page] = await db.select().from(contactPage).limit(1);
        return page || null;
    },

    async updateContactPage(data: {
        whatsappNumber?: string;
        defaultMessage?: string;
    }) {
        const [existing] = await db.select().from(contactPage).limit(1);

        if (existing) {
            await db.update(contactPage).set({
                whatsappNumber: data.whatsappNumber,
                defaultMessage: data.defaultMessage,
                updatedAt: new Date(),
            }).where(eq(contactPage.id, existing.id));
        } else {
            await db.insert(contactPage).values({
                whatsappNumber: data.whatsappNumber,
                defaultMessage: data.defaultMessage,
            });
        }

        return this.getContactPage();
    },
};
