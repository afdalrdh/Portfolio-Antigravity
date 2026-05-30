import { db } from '../db/index.js';
import { contactPage } from '../db/schema/contact.js';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';

export const contactService = {
    async getContactPage() {
        const [page] = await db.select().from(contactPage).limit(1);
        return page || null;
    },

    async updateContactPage(data: {
        whatsappNumber?: string;
        defaultMessage?: string;
        email?: string;
        phone?: string;
        location?: string;
    }) {
        const [existing] = await db.select().from(contactPage).limit(1);

        if (existing) {
            await db.update(contactPage).set({
                whatsappNumber: data.whatsappNumber,
                defaultMessage: data.defaultMessage,
                email: data.email,
                phone: data.phone,
                location: data.location,
                updatedAt: new Date(),
            }).where(eq(contactPage.id, existing.id));
        } else {
            await db.insert(contactPage).values({
                whatsappNumber: data.whatsappNumber,
                defaultMessage: data.defaultMessage,
                email: data.email,
                phone: data.phone,
                location: data.location,
            });
        }

        return this.getContactPage();
    },

    async sendMessage(data: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        projectType: string;
        message: string;
    }) {
        const [page] = await db.select().from(contactPage).limit(1);
        const targetEmail = page?.email || 'afdalramdan@gmail.com';

        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.warn('SMTP_EMAIL or SMTP_PASSWORD not set. Email not actually sent.');
            return { success: true, warning: 'SMTP not configured' };
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: targetEmail,
            subject: `New Message: ${data.projectType} from ${data.firstName} ${data.lastName}`,
            text: `
You received a new message from your portfolio website!

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Project Type: ${data.projectType}

Message:
${data.message}
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            return { success: true };
        } catch (error) {
            console.error('Email sending failed:', error);
            throw new Error('Failed to send email. Please ensure SMTP credentials are correct.');
        }
    }
};
