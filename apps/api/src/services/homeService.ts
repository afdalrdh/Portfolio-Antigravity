import { db } from '../db/index';
import { homePage, socialLinks } from '../db/schema/home.js';
import { eq } from 'drizzle-orm';

export const homeService = {
    async getHomePage() {
        try {
            const [page] = await db.select().from(homePage).limit(1);
            const links = await db.select().from(socialLinks).orderBy(socialLinks.sortOrder);
            if (page) {
                return { page, socialLinks: links };
            }
        } catch (err) {
            console.warn('DB query failed, using fallback home data:', (err as any)?.message);
        }

        return {
            page: {
                id: 1,
                profileImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
                heroHeadline: 'Hey, I\'m Afdal UI/UX Designer with <strong>4 years of experience</strong>. I design and develop digital products, create prototypes, and design interfaces.',
                ctaText: 'Interested in working together? Contact me!',
                ctaUrl: 'https://wa.me/6281234567890?text=Halo%20Afdal,%20saya%20mau%20bekerja%20sama...',
            },
            socialLinks: [
                { id: 1, name: 'Instagram', url: 'https://instagram.com/afdalrdh', sortOrder: 0 },
                { id: 2, name: 'LinkedIn', url: 'https://linkedin.com/in/afdalrdh', sortOrder: 1 },
                { id: 3, name: 'Dribbble', url: 'https://dribbble.com/afdalrdh', sortOrder: 2 },
                { id: 4, name: 'Resume', url: '/resume.pdf', sortOrder: 3 },
            ]
        };
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
