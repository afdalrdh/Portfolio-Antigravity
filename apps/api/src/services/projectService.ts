import { db } from '../db/index.js';
import { projects, projectBlocks } from '../db/schema/project.js';
import { eq } from 'drizzle-orm';

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
    year?: string;
    liveLink?: string;
    coverImageUrl?: string;
    visibility?: string;
    blocks?: BlockInput[];
};

export const projectService = {
    async listProjects(onlyPublic = false) {
        if (onlyPublic) {
            return db.select().from(projects).where(eq(projects.visibility, 'public')).orderBy(projects.createdAt);
        }
        return db.select().from(projects).orderBy(projects.createdAt);
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
        const [project] = await db.insert(projects).values({
            title: data.title,
            category: data.category,
            slug: data.slug,
            company: data.company,
            year: data.year,
            liveLink: data.liveLink,
            coverImageUrl: data.coverImageUrl,
            visibility: data.visibility || 'draft',
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

        await db.update(projects).set({
            title: data.title ?? existing.title,
            category: data.category ?? existing.category,
            slug: data.slug ?? existing.slug,
            company: data.company ?? existing.company,
            year: data.year ?? existing.year,
            liveLink: data.liveLink ?? existing.liveLink,
            coverImageUrl: data.coverImageUrl ?? existing.coverImageUrl,
            visibility: data.visibility ?? existing.visibility,
            updatedAt: new Date(),
        }).where(eq(projects.id, id));

        // Replace blocks if provided
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
};
