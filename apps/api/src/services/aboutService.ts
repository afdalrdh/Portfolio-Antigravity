import { db } from '../db/index.js';
import { aboutPage, aboutTools, experiences, certifications, galleryImages } from '../db/schema/about.js';
import { eq, sql } from 'drizzle-orm';

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
        // Use a transaction so if anything fails, nothing is lost
        return await db.transaction(async (tx) => {
            // Update bio description
            const bio = data.page?.bioDescription ?? data.bioDescription;
            const [existing] = await tx.select().from(aboutPage).limit(1);

            if (existing) {
                await tx.update(aboutPage).set({
                    bioDescription: bio,
                    updatedAt: new Date(),
                }).where(eq(aboutPage.id, existing.id));
            } else {
                await tx.insert(aboutPage).values({
                    bioDescription: bio,
                });
            }

            // Replace tools
            if (data.tools) {
                await tx.delete(aboutTools);
                if (data.tools.length > 0) {
                    await tx.insert(aboutTools).values(
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
                await tx.delete(experiences);
                if (data.experiences.length > 0) {
                    // Insert one by one to avoid bulk insert issues
                    for (let i = 0; i < data.experiences.length; i++) {
                        const exp = data.experiences[i];
                        await tx.insert(experiences).values({
                            logoUrl: exp.logoUrl || '',
                            title: exp.title || exp.jobTitle || '',
                            company: exp.company || '',
                            dateStart: exp.dateStart || '',
                            dateEnd: exp.dateEnd || 'Present',
                            contractType: exp.type || exp.contractType || '',
                            sortOrder: i,
                        });
                    }
                }
            }

            // Replace certifications
            if (data.certifications) {
                await tx.delete(certifications);
                if (data.certifications.length > 0) {
                    for (let i = 0; i < data.certifications.length; i++) {
                        const cert = data.certifications[i];
                        await tx.insert(certifications).values({
                            logoUrl: cert.logoUrl || '',
                            title: cert.title || cert.name || '',
                            issuer: cert.issuer || '',
                            dateStart: cert.dateStart || cert.issueDate || '',
                            dateEnd: cert.dateEnd || '',
                            sortOrder: i,
                        });
                    }
                }
            }

            // Replace gallery images
            if (data.galleryImages) {
                await tx.delete(galleryImages);
                if (data.galleryImages.length > 0) {
                    for (let i = 0; i < data.galleryImages.length; i++) {
                        const img = data.galleryImages[i];
                        await tx.insert(galleryImages).values({
                            imageUrl: img.imageUrl || img.url || '',
                            sortOrder: i,
                        });
                    }
                }
            }
        }).then(async () => {
            return this.getAboutPage();
        });
    },
};
