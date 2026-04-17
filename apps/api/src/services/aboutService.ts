import { db } from '../db/index.js';
import { aboutPage, experiences, certifications, galleryImages } from '../db/schema/about.js';
import { eq } from 'drizzle-orm';

export const aboutService = {
    async getAboutPage() {
        const [page] = await db.select().from(aboutPage).limit(1);
        const exps = await db.select().from(experiences).orderBy(experiences.sortOrder);
        const certs = await db.select().from(certifications).orderBy(certifications.sortOrder);
        const gallery = await db.select().from(galleryImages).orderBy(galleryImages.sortOrder);
        return {
            page: page || null,
            experiences: exps,
            certifications: certs,
            galleryImages: gallery,
        };
    },

    async updateAboutPage(data: {
        bioDescription?: string;
        experiences?: { initials: string; jobTitle: string; company: string; dateRange: string; contractType: string }[];
        certifications?: { initials: string; name: string; issuer: string; issueDate: string }[];
        galleryImages?: { imageUrl: string }[];
    }) {
        const [existing] = await db.select().from(aboutPage).limit(1);

        if (existing) {
            await db.update(aboutPage).set({
                bioDescription: data.bioDescription,
                updatedAt: new Date(),
            }).where(eq(aboutPage.id, existing.id));
        } else {
            await db.insert(aboutPage).values({
                bioDescription: data.bioDescription,
            });
        }

        // Replace experiences
        if (data.experiences) {
            await db.delete(experiences);
            if (data.experiences.length > 0) {
                await db.insert(experiences).values(
                    data.experiences.map((exp, index) => ({
                        initials: exp.initials,
                        jobTitle: exp.jobTitle,
                        company: exp.company,
                        dateRange: exp.dateRange,
                        contractType: exp.contractType,
                        sortOrder: index,
                    }))
                );
            }
        }

        // Replace certifications
        if (data.certifications) {
            await db.delete(certifications);
            if (data.certifications.length > 0) {
                await db.insert(certifications).values(
                    data.certifications.map((cert, index) => ({
                        initials: cert.initials,
                        name: cert.name,
                        issuer: cert.issuer,
                        issueDate: cert.issueDate,
                        sortOrder: index,
                    }))
                );
            }
        }

        // Replace gallery images
        if (data.galleryImages) {
            await db.delete(galleryImages);
            if (data.galleryImages.length > 0) {
                await db.insert(galleryImages).values(
                    data.galleryImages.map((img, index) => ({
                        imageUrl: img.imageUrl,
                        sortOrder: index,
                    }))
                );
            }
        }

        return this.getAboutPage();
    },
};
