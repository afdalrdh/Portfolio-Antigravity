import { db } from '../db/index.js';
import { services } from '../db/schema/services.js';
import { eq, desc } from 'drizzle-orm';

export type ServiceInput = {
    title: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    scope?: string[];
    process?: { title: string; description: string }[];
    faq?: { question: string; answer: string }[];
    heroImageUrl?: string;
    heroImageId?: string;
    seoTitle?: string;
    seoDescription?: string;
    published?: boolean;
    sortOrder?: number;
};

export const servicesService = {
    async listServices(onlyPublished = false) {
        if (onlyPublished) {
            return db.select().from(services).where(eq(services.published, true)).orderBy(services.sortOrder, desc(services.createdAt));
        }
        return db.select().from(services).orderBy(services.sortOrder, desc(services.createdAt));
    },

    async getServiceById(id: number) {
        const [row] = await db.select().from(services).where(eq(services.id, id)).limit(1);
        return row || null;
    },

    async getServiceBySlug(slug: string) {
        const [row] = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
        return row || null;
    },

    async createService(data: ServiceInput) {
        const [row] = await db.insert(services).values({
            title: data.title,
            slug: data.slug,
            shortDescription: data.shortDescription,
            description: data.description,
            scope: data.scope || [],
            process: data.process || [],
            faq: data.faq || [],
            heroImageUrl: data.heroImageUrl,
            heroImageId: data.heroImageId,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            published: data.published !== undefined ? data.published : true,
            sortOrder: data.sortOrder || 0,
        }).returning();
        return row;
    },

    async updateService(id: number, data: Partial<ServiceInput>) {
        const [existing] = await db.select().from(services).where(eq(services.id, id)).limit(1);
        if (!existing) return null;

        const [updated] = await db.update(services).set({
            title: data.title ?? existing.title,
            slug: data.slug ?? existing.slug,
            shortDescription: data.shortDescription ?? existing.shortDescription,
            description: data.description ?? existing.description,
            scope: data.scope ?? existing.scope,
            process: data.process ?? existing.process,
            faq: data.faq ?? existing.faq,
            heroImageUrl: data.heroImageUrl ?? existing.heroImageUrl,
            heroImageId: data.heroImageId ?? existing.heroImageId,
            seoTitle: data.seoTitle ?? existing.seoTitle,
            seoDescription: data.seoDescription ?? existing.seoDescription,
            published: data.published ?? existing.published,
            sortOrder: data.sortOrder ?? existing.sortOrder,
            updatedAt: new Date(),
        }).where(eq(services.id, id)).returning();

        return updated;
    },

    async deleteService(id: number) {
        const [deleted] = await db.delete(services).where(eq(services.id, id)).returning();
        return deleted || null;
    }
};
