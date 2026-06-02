import { db } from '../db/index.js';
import { homePage, socialLinks } from '../db/schema/home.js';
import { eq } from 'drizzle-orm';

export const homeService = {
    async getHomePage() {
        const [page] = await db.select().from(homePage).limit(1);
        const links = await db.select().from(socialLinks).orderBy(socialLinks.sortOrder);
        return { page: page || null, socialLinks: links };
    },

    async updateHomePage(data: {
        profileImageUrl?: string;
        heroHeadline?: string;
        ctaText?: string;
        ctaUrl?: string;
        socialLinks?: { name: string; url: string }[];
    }) {
        const [existing] = await db.select().from(homePage).limit(1);

        if (existing) {
            await db.update(homePage).set({
                profileImageUrl: data.profileImageUrl,
                heroHeadline: data.heroHeadline,
                ctaText: data.ctaText,
                ctaUrl: data.ctaUrl,
                updatedAt: new Date(),
            }).where(eq(homePage.id, existing.id));
        } else {
            await db.insert(homePage).values({
                profileImageUrl: data.profileImageUrl,
                heroHeadline: data.heroHeadline,
                ctaText: data.ctaText,
                ctaUrl: data.ctaUrl,
            });
        }

        // Replace social links
        if (data.socialLinks) {
            await db.delete(socialLinks);
            if (data.socialLinks.length > 0) {
                await db.insert(socialLinks).values(
                    data.socialLinks.map((link, index) => ({
                        name: link.name,
                        url: link.url,
                        sortOrder: index,
                    }))
                );
            }
        }

        return this.getHomePage();
    },
};
