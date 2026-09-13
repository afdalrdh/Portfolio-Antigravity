import { db } from '../db/index';
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
    sortOrder?: number;
    blocks?: BlockInput[];
};

const DEFAULT_PROJECTS = [
    {
        id: 1,
        title: 'Geowisata Landing Page',
        slug: 'geowisata-landing-page',
        company: 'Geowisata',
        year: '2024',
        liveLink: '',
        coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        visibility: 'public',
        sortOrder: 0,
        blocks: [
            { id: 1, projectId: 1, type: 'narrative', sortOrder: 0, title: 'About the project', text: 'Geowisata is a tourism platform designed to showcase Indonesia\'s geological wonders.' },
            { id: 2, projectId: 1, type: 'image_main', sortOrder: 1, imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200' }
        ]
    },
    {
        id: 2,
        title: 'Alpinist Mobile App',
        slug: 'alpinist-mobile-app',
        company: 'Alpinist',
        year: '2024',
        liveLink: '',
        coverImageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
        visibility: 'public',
        sortOrder: 1,
        blocks: [
            { id: 3, projectId: 2, type: 'narrative', sortOrder: 0, title: 'About the project', text: 'Alpinist is a mobile application designed for mountain climbing enthusiasts.' }
        ]
    },
    {
        id: 3,
        title: 'Fintech Dashboard UI',
        slug: 'fintech-dashboard-ui',
        company: 'Runway Inc.',
        year: '2024',
        liveLink: 'https://runway.com',
        coverImageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800',
        visibility: 'public',
        sortOrder: 2,
        blocks: [
            { id: 4, projectId: 3, type: 'narrative', sortOrder: 0, title: 'About the project', text: 'Runway is an innovative financial dashboard designed specifically to streamline financial workflows.' }
        ]
    },
    {
        id: 4,
        title: 'E-Commerce Experience',
        slug: 'e-commerce-experience',
        company: 'ShopX',
        year: '2023',
        liveLink: '',
        coverImageUrl: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=800',
        visibility: 'public',
        sortOrder: 3,
        blocks: [
            { id: 5, projectId: 4, type: 'narrative', sortOrder: 0, title: 'About the project', text: 'A complete e-commerce redesign focusing on user experience and conversion optimization.' }
        ]
    }
];

export const projectService = {
    async listProjects(onlyPublic = false) {
        try {
            if (onlyPublic) {
                const list = await db.select().from(projects).where(eq(projects.visibility, 'public')).orderBy(projects.sortOrder, projects.createdAt);
                if (list && list.length > 0) return list;
            } else {
                const list = await db.select().from(projects).orderBy(projects.sortOrder, projects.createdAt);
                if (list && list.length > 0) return list;
            }
        } catch (err) {
            console.warn('DB query failed, using fallback projects:', (err as any)?.message);
        }
        return DEFAULT_PROJECTS;
    },

    async getProjectBySlug(slug: string) {
        try {
            const [project] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
            if (project) {
                const blocks = await db.select().from(projectBlocks).where(eq(projectBlocks.projectId, project.id)).orderBy(projectBlocks.sortOrder);
                return { ...project, blocks };
            }
        } catch (err) {
            console.warn('DB query failed, using fallback project:', (err as any)?.message);
        }
        return DEFAULT_PROJECTS.find(p => p.slug === slug) || DEFAULT_PROJECTS[0];
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

        await db.update(projects).set({
            title: data.title ?? existing.title,
            category: data.category ?? existing.category,
            slug: data.slug ?? existing.slug,
            company: data.company ?? existing.company,
            year: data.year ?? existing.year,
            liveLink: data.liveLink ?? existing.liveLink,
            coverImageUrl: data.coverImageUrl ?? existing.coverImageUrl,
            visibility: data.visibility ?? existing.visibility,
            sortOrder: data.sortOrder ?? existing.sortOrder,
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
