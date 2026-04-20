import { db } from '../db/index.js';
import { aboutPage, aboutTools, experiences, certifications, galleryImages } from '../db/schema/about.js';
import { eq } from 'drizzle-orm';

export const aboutService = {
    async getAboutPage() {
        const [page] = await db.select().from(aboutPage).limit(1);
        const tools = await db.select().from(aboutTools).orderBy(aboutTools.sortOrder);
        const exps = await db.select().from(experiences).orderBy(experiences.sortOrder);
        const certs = await db.select().from(certifications).orderBy(certifications.sortOrder);
        const gallery = await db.select().from(galleryImages).orderBy(galleryImages.sortOrder);
        return {
            page: page || null,
            tools,
            experiences: exps,
            certifications: certs,
            galleryImages: gallery,
        };
    },

    async updateAboutPage(data: any) {
        // Update bio description
        const bio = data.page?.bioDescription ?? data.bioDescription;
        const [existing] = await db.select().from(aboutPage).limit(1);

        if (existing) {
            await db.update(aboutPage).set({
                bioDescription: bio,
                updatedAt: new Date(),
            }).where(eq(aboutPage.id, existing.id));
        } else {
            await db.insert(aboutPage).values({
                bioDescription: bio,
            });
        }

        // Replace tools
        if (data.tools) {
            await db.delete(aboutTools);
            if (data.tools.length > 0) {
                await db.insert(aboutTools).values(
                    data.tools.map((tool: any, index: number) => ({
                        name: tool.name || '',
                        iconCode: tool.iconCode || '',
                        sortOrder: index,
                    }))
                );
            }
        }

        // Replace experiences
        if (data.experiences) {
            await db.delete(experiences);
            if (data.experiences.length > 0) {
                await db.insert(experiences).values(
                    data.experiences.map((exp: any, index: number) => ({
                        logoUrl: exp.logoUrl || '',
                        title: exp.title || exp.jobTitle || '',
                        company: exp.company || '',
                        dateStart: exp.dateStart || '',
                        dateEnd: exp.dateEnd || 'Present',
                        contractType: exp.type || exp.contractType || '',
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
                    data.certifications.map((cert: any, index: number) => ({
                        logoUrl: cert.logoUrl || '',
                        title: cert.title || cert.name || '',
                        issuer: cert.issuer || '',
                        dateStart: cert.dateStart || cert.issueDate || '',
                        dateEnd: cert.dateEnd || '',
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
                    data.galleryImages.map((img: any, index: number) => ({
                        imageUrl: img.imageUrl || img.url || '',
                        sortOrder: index,
                    }))
                );
            }
        }

        return this.getAboutPage();
    },
};
