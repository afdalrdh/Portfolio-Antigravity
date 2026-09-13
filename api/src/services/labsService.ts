import { db } from '../db/index.js';
import { creations } from '../db/schema/labs.js';
import { eq, desc, ilike, and, sql } from 'drizzle-orm';

export const labsService = {
    async getCreations(search?: string, category?: string) {
        const conditions = [];
        
        if (search) {
            conditions.push(ilike(creations.title, `%${search}%`));
        }
        
        if (category) {
            conditions.push(ilike(creations.category, `%${category}%`));
        }

        const query = db
            .select()
            .from(creations)
            .orderBy(desc(creations.createdAt));

        if (conditions.length > 0) {
            query.where(and(...conditions));
        }

        return await query;
    },

    async getCategories() {
        const result = await db
            .selectDistinct({ category: creations.category })
            .from(creations)
            .where(sql`${creations.category} != ''`);
        
        // Split comma-separated categories, trim, and unique them
        const allCategories = new Set<string>();
        result.forEach(r => {
            const parts = r.category.split(',');
            parts.forEach(p => {
                const trimmed = p.trim();
                if (trimmed) allCategories.add(trimmed);
            });
        });
        return Array.from(allCategories);
    },

    async getCreationById(id: number) {
        const [creation] = await db.select().from(creations).where(eq(creations.id, id)).limit(1);
        return creation || null;
    },

    async createCreation(data: { title: string; imageUrl: string; category: string }) {
        const [newCreation] = await db.insert(creations).values({
            title: data.title,
            imageUrl: data.imageUrl,
            category: data.category,
        }).returning();
        return newCreation;
    },

    async updateCreation(id: number, data: { title?: string; imageUrl?: string; category?: string }) {
        const [updated] = await db.update(creations).set({
            title: data.title,
            imageUrl: data.imageUrl,
            category: data.category,
            updatedAt: new Date(),
        }).where(eq(creations.id, id)).returning();
        return updated;
    },

    async deleteCreation(id: number) {
        await db.delete(creations).where(eq(creations.id, id));
        return true;
    }
};
