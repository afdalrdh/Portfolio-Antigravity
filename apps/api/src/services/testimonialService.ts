import { db } from '../db/index.js';
import { testimonials } from '../db/schema/testimonials.js';
import { eq, and, desc } from 'drizzle-orm';

export type TestimonialInput = {
    clientName: string;
    clientRole?: string;
    quote: string;
    projectName?: string;
    imageUrl?: string;
    imageId?: string;
    approved?: boolean;
    published?: boolean;
    sortOrder?: number;
};

export const testimonialService = {
    async listTestimonials(onlyPublic = false) {
        if (onlyPublic) {
            return db.select()
                .from(testimonials)
                .where(and(eq(testimonials.approved, true), eq(testimonials.published, true)))
                .orderBy(testimonials.sortOrder, desc(testimonials.createdAt));
        }
        return db.select().from(testimonials).orderBy(testimonials.sortOrder, desc(testimonials.createdAt));
    },

    async getTestimonialById(id: number) {
        const [row] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
        return row || null;
    },

    async createTestimonial(data: TestimonialInput) {
        const [row] = await db.insert(testimonials).values({
            clientName: data.clientName,
            clientRole: data.clientRole,
            quote: data.quote,
            projectName: data.projectName,
            imageUrl: data.imageUrl,
            imageId: data.imageId,
            approved: data.approved !== undefined ? data.approved : false,
            published: data.published !== undefined ? data.published : false,
            sortOrder: data.sortOrder || 0,
        }).returning();
        return row;
    },

    async updateTestimonial(id: number, data: Partial<TestimonialInput>) {
        const [existing] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
        if (!existing) return null;

        const [updated] = await db.update(testimonials).set({
            clientName: data.clientName ?? existing.clientName,
            clientRole: data.clientRole ?? existing.clientRole,
            quote: data.quote ?? existing.quote,
            projectName: data.projectName ?? existing.projectName,
            imageUrl: data.imageUrl ?? existing.imageUrl,
            imageId: data.imageId ?? existing.imageId,
            approved: data.approved ?? existing.approved,
            published: data.published ?? existing.published,
            sortOrder: data.sortOrder ?? existing.sortOrder,
            updatedAt: new Date(),
        }).where(eq(testimonials.id, id)).returning();

        return updated;
    },

    async deleteTestimonial(id: number) {
        const [deleted] = await db.delete(testimonials).where(eq(testimonials.id, id)).returning();
        return deleted || null;
    }
};
