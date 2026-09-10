import { db } from '../db/index.js';
import { projects } from '../db/schema/project.js';
import { articles } from '../db/schema/articles.js';
import { testimonials } from '../db/schema/testimonials.js';
import { inquiries } from '../db/schema/inquiries.js';
import { eq, desc } from 'drizzle-orm';

export const statsService = {
    async getDashboardStats() {
        // Projects
        const allProjects = await db.select().from(projects);
        const totalProjects = allProjects.length;
        const publishedProjects = allProjects.filter(p => p.published).length;
        const draftProjects = totalProjects - publishedProjects;

        // Articles
        const allArticles = await db.select().from(articles);
        const totalArticles = allArticles.length;
        const publishedArticles = allArticles.filter(a => a.published).length;
        const draftArticles = totalArticles - publishedArticles;

        // Testimonials
        const allTestimonials = await db.select().from(testimonials);
        const totalTestimonials = allTestimonials.length;
        const publishedTestimonials = allTestimonials.filter(t => t.approved && t.published).length;
        const pendingTestimonials = allTestimonials.filter(t => !t.approved).length;

        // Inquiries
        const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
        const totalInquiries = allInquiries.length;
        const newInquiries = allInquiries.filter(i => i.status === 'new').length;
        const reviewingInquiries = allInquiries.filter(i => i.status === 'reviewing').length;
        const contactedInquiries = allInquiries.filter(i => i.status === 'contacted').length;
        const qualifiedInquiries = allInquiries.filter(i => i.status === 'qualified').length;
        const closedInquiries = allInquiries.filter(i => i.status === 'closed').length;

        const recentInquiries = allInquiries.slice(0, 5);
        const recentProjects = allProjects.slice(0, 5);

        return {
            projects: {
                total: totalProjects,
                published: publishedProjects,
                drafts: draftProjects,
            },
            articles: {
                total: totalArticles,
                published: publishedArticles,
                drafts: draftArticles,
            },
            testimonials: {
                total: totalTestimonials,
                published: publishedTestimonials,
                pending: pendingTestimonials,
            },
            inquiries: {
                total: totalInquiries,
                new: newInquiries,
                reviewing: reviewingInquiries,
                contacted: contactedInquiries,
                qualified: qualifiedInquiries,
                closed: closedInquiries,
            },
            recentInquiries,
            recentProjects,
        };
    }
};
