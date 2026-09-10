import { db } from '../db/index.js';
import { projects, projectBlocks } from '../db/schema/project.js';
import { eq, desc } from 'drizzle-orm';

type BlockInput = {
    type: string;
    title?: string;
    text?: string;
    imageUrl?: string;
    imageUrl2?: string;
    fontFamily?: string;
    colors?: string[];
};

type ProjectInput = {
    title: string;
    category?: string;
    slug: string;
    company?: string;
    location?: string;
    year?: string;
    clientContext?: string;
    arsiKaryaRole?: string;
    description?: string;
    scope?: string;
    process?: string;
    liveLink?: string;
    coverImageUrl?: string;
    coverImageId?: string;
    gallery?: any[];
    published?: boolean;
    visibility?: string;
    seoTitle?: string;
    seoDescription?: string;
    sortOrder?: number;
    blocks?: BlockInput[];
};

export const projectService = {
    async listProjects(onlyPublic = false) {
        if (onlyPublic) {
            return db.select().from(projects).where(eq(projects.published, true)).orderBy(projects.sortOrder, desc(projects.createdAt));
        }
        return db.select().from(projects).orderBy(projects.sortOrder, desc(projects.createdAt));
    },

    async getProjectBySlug(slug: string) {
        const [project] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
        if (!project) return null;
        const blocks = await db.select().from(projectBlocks).where(eq(projectBlocks.projectId, project.id)).orderBy(projectBlocks.sortOrder);
        return { ...project, blocks };
    },

    async getProjectById(id: number) {
        const [project] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
        if (!project) return null;
        const blocks = await db.select().from(projectBlocks).where(eq(projectBlocks.projectId, project.id)).orderBy(projectBlocks.sortOrder);
        return { ...project, blocks };
    },

    async createProject(data: ProjectInput) {
        const publishedVal = data.published !== undefined ? data.published : (data.visibility === 'public');
        const [project] = await db.insert(projects).values({
            title: data.title,
            category: data.category,
            slug: data.slug,
            company: data.company,
            location: data.location,
            year: data.year,
            clientContext: data.clientContext,
            arsiKaryaRole: data.arsiKaryaRole,
            description: data.description,
            scope: data.scope,
            process: data.process,
            liveLink: data.liveLink,
            coverImageUrl: data.coverImageUrl,
            coverImageId: data.coverImageId,
            gallery: data.gallery || [],
            published: publishedVal,
            visibility: publishedVal ? 'public' : 'draft',
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            sortOrder: data.sortOrder || 0,
        }).returning();

        if (data.blocks && data.blocks.length > 0) {
            await db.insert(projectBlocks).values(
                data.blocks.map((block, index) => ({
                    projectId: project.id,
                    type: block.type,
                    sortOrder: index,
                    title: block.title,
                    text: block.text,
                    imageUrl: block.imageUrl,
                    imageUrl2: block.imageUrl2,
                    fontFamily: block.fontFamily,
                    colors: block.colors,
                }))
            );
        }

        return this.getProjectById(project.id);
    },

    async updateProject(id: number, data: Partial<ProjectInput>) {
        const [existing] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
        if (!existing) return null;

        const publishedVal = data.published !== undefined
            ? data.published
            : (data.visibility !== undefined ? (data.visibility === 'public') : existing.published);

        await db.update(projects).set({
            title: data.title ?? existing.title,
            category: data.category ?? existing.category,
            slug: data.slug ?? existing.slug,
            company: data.company ?? existing.company,
            location: data.location ?? existing.location,
            year: data.year ?? existing.year,
            clientContext: data.clientContext ?? existing.clientContext,
            arsiKaryaRole: data.arsiKaryaRole ?? existing.arsiKaryaRole,
            description: data.description ?? existing.description,
            scope: data.scope ?? existing.scope,
            process: data.process ?? existing.process,
            liveLink: data.liveLink ?? existing.liveLink,
            coverImageUrl: data.coverImageUrl ?? existing.coverImageUrl,
            coverImageId: data.coverImageId ?? existing.coverImageId,
            gallery: data.gallery ?? existing.gallery,
            published: publishedVal,
            visibility: publishedVal ? 'public' : 'draft',
            seoTitle: data.seoTitle ?? existing.seoTitle,
            seoDescription: data.seoDescription ?? existing.seoDescription,
            sortOrder: data.sortOrder ?? existing.sortOrder,
            updatedAt: new Date(),
        }).where(eq(projects.id, id));

        if (data.blocks) {
            await db.delete(projectBlocks).where(eq(projectBlocks.projectId, id));
            if (data.blocks.length > 0) {
                await db.insert(projectBlocks).values(
                    data.blocks.map((block, index) => ({
                        projectId: id,
                        type: block.type,
                        sortOrder: index,
                        title: block.title,
                        text: block.text,
                        imageUrl: block.imageUrl,
                        imageUrl2: block.imageUrl2,
                        fontFamily: block.fontFamily,
                        colors: block.colors,
                    }))
                );
            }
        }

        return this.getProjectById(id);
    },

    async deleteProject(id: number) {
        const [deleted] = await db.delete(projects).where(eq(projects.id, id)).returning();
        return deleted || null;
    },

    async reorderProjects(projectIds: number[]) {
        return await db.transaction(async (tx) => {
            for (let i = 0; i < projectIds.length; i++) {
                await tx.update(projects)
                    .set({ sortOrder: i })
                    .where(eq(projects.id, projectIds[i]));
            }
        });
    },
};
