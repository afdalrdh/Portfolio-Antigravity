import { db } from '../db/index.js';
import { articles } from '../db/schema/articles.js';
import { eq, desc } from 'drizzle-orm';

export type ArticleInput = {
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    coverImageUrl?: string;
    coverImageId?: string;
    category?: string;
    author?: string;
    publishedDate?: Date | string;
    seoTitle?: string;
    seoDescription?: string;
    published?: boolean;
};

export const articleService = {
    async listArticles(onlyPublished = false) {
        if (onlyPublished) {
            return db.select().from(articles).where(eq(articles.published, true)).orderBy(desc(articles.publishedDate), desc(articles.createdAt));
        }
        return db.select().from(articles).orderBy(desc(articles.publishedDate), desc(articles.createdAt));
    },

    async getArticleById(id: number) {
        const [row] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
        return row || null;
    },

    async getArticleBySlug(slug: string) {
        const [row] = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
        return row || null;
    },

    async createArticle(data: ArticleInput) {
        const [row] = await db.insert(articles).values({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            coverImageUrl: data.coverImageUrl,
            coverImageId: data.coverImageId,
            category: data.category || 'Tips',
            author: data.author || 'Arsi Karya Team',
            publishedDate: data.publishedDate ? new Date(data.publishedDate) : new Date(),
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            published: data.published !== undefined ? data.published : false,
        }).returning();
        return row;
    },

    async updateArticle(id: number, data: Partial<ArticleInput>) {
        const [existing] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
        if (!existing) return null;

        const [updated] = await db.update(articles).set({
            title: data.title ?? existing.title,
            slug: data.slug ?? existing.slug,
            excerpt: data.excerpt ?? existing.excerpt,
            content: data.content ?? existing.content,
            coverImageUrl: data.coverImageUrl ?? existing.coverImageUrl,
            coverImageId: data.coverImageId ?? existing.coverImageId,
            category: data.category ?? existing.category,
            author: data.author ?? existing.author,
            publishedDate: data.publishedDate ? new Date(data.publishedDate) : existing.publishedDate,
            seoTitle: data.seoTitle ?? existing.seoTitle,
            seoDescription: data.seoDescription ?? existing.seoDescription,
            published: data.published ?? existing.published,
            updatedAt: new Date(),
        }).where(eq(articles.id, id)).returning();

        return updated;
    },

    async deleteArticle(id: number) {
        const [deleted] = await db.delete(articles).where(eq(articles.id, id)).returning();
        return deleted || null;
    }
};
