import { db } from '../db/index.js';
import { media } from '../db/schema/media.js';
import { projects } from '../db/schema/project.js';
import { services } from '../db/schema/services.js';
import { articles } from '../db/schema/articles.js';
import { testimonials } from '../db/schema/testimonials.js';
import { siteSettings } from '../db/schema/siteSettings.js';
import { eq, desc, or } from 'drizzle-orm';

export type MediaInput = {
    publicId: string;
    url: string;
    secureUrl?: string;
    format?: string;
    width?: number;
    height?: number;
    bytes?: number;
    folder?: string;
    altText?: string;
};

export const mediaService = {
    async listMedia() {
        return db.select().from(media).orderBy(desc(media.createdAt));
    },

    async getMediaById(id: number) {
        const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);
        return row || null;
    },

    async createMedia(data: MediaInput) {
        // Upsert by publicId
        const [existing] = await db.select().from(media).where(eq(media.publicId, data.publicId)).limit(1);
        if (existing) {
            return existing;
        }

        const [row] = await db.insert(media).values({
            publicId: data.publicId,
            url: data.url,
            secureUrl: data.secureUrl || data.url,
            format: data.format,
            width: data.width,
            height: data.height,
            bytes: data.bytes,
            folder: data.folder || 'arsikarya',
            altText: data.altText,
        }).returning();
        return row;
    },

    async checkMediaUsage(urlOrId: string) {
        const usage: string[] = [];

        // Check projects
        const matchedProjects = await db.select().from(projects).where(
            or(eq(projects.coverImageUrl, urlOrId), eq(projects.coverImageId, urlOrId))
        );
        if (matchedProjects.length > 0) {
            usage.push(`Proyek (${matchedProjects.length}): ${matchedProjects.map(p => p.title).join(', ')}`);
        }

        // Check services
        const matchedServices = await db.select().from(services).where(
            or(eq(services.heroImageUrl, urlOrId), eq(services.heroImageId, urlOrId))
        );
        if (matchedServices.length > 0) {
            usage.push(`Layanan (${matchedServices.length}): ${matchedServices.map(s => s.title).join(', ')}`);
        }

        // Check articles
        const matchedArticles = await db.select().from(articles).where(
            or(eq(articles.coverImageUrl, urlOrId), eq(articles.coverImageId, urlOrId))
        );
        if (matchedArticles.length > 0) {
            usage.push(`Artikel (${matchedArticles.length}): ${matchedArticles.map(a => a.title).join(', ')}`);
        }

        // Check testimonials
        const matchedTestimonials = await db.select().from(testimonials).where(
            or(eq(testimonials.imageUrl, urlOrId), eq(testimonials.imageId, urlOrId))
        );
        if (matchedTestimonials.length > 0) {
            usage.push(`Testimoni (${matchedTestimonials.length}): ${matchedTestimonials.map(t => t.clientName).join(', ')}`);
        }

        // Check site settings
        const matchedSettings = await db.select().from(siteSettings).where(
            or(eq(siteSettings.logoUrl, urlOrId), eq(siteSettings.socialImageUrl, urlOrId))
        );
        if (matchedSettings.length > 0) {
            usage.push('Pengaturan Website (Logo / Social Image)');
        }

        return usage;
    },

    async deleteMedia(id: number) {
        const item = await this.getMediaById(id);
        if (!item) return null;

        const usage = await this.checkMediaUsage(item.url);
        if (usage.length > 0) {
            throw new Error(`Media sedang digunakan oleh: ${usage.join('; ')}`);
        }

        const [deleted] = await db.delete(media).where(eq(media.id, id)).returning();
        return deleted || null;
    }
};
