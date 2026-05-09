import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import { requireAuth } from './middleware/requireAuth.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — allow frontend origin with credentials
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Better-Auth-Token'],
    exposedHeaders: ['set-auth-token'],
}));

// Better Auth handler — must be before express.json() as it handles its own body parsing
app.all('/api/auth/*', toNodeHandler(auth));

// Body parsing & cookies
app.use(express.json());
app.use(cookieParser());

// Public routes (no auth required)
app.use('/api', publicRoutes);

// Admin routes (auth required)
app.use('/api/admin', requireAuth, adminRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Debug: inspect table structure (temporary)
app.get('/api/debug/schema', async (_req, res) => {
    try {
        const { db } = await import('./db/index.js');
        const { sql } = await import('drizzle-orm');
        const result = await db.execute(sql`
            SELECT table_name, column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name IN ('experiences', 'certifications', 'about_tools', 'gallery_images', 'about_page')
            ORDER BY table_name, ordinal_position
        `);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: (error as any)?.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API server running at http://localhost:${PORT}`);
    console.log(`📡 Auth endpoints at http://localhost:${PORT}/api/auth`);
    console.log(`🌐 CORS origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});
