import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import publicRoutes from '../apps/api/src/routes/publicRoutes.js';

const app = express();

// CORS
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
    origin: (origin, callback) => {
        // Allow all origins or match production domain
        callback(null, true);
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Better-Auth-Token'],
    exposedHeaders: ['set-auth-token'],
}));

// Better Auth handler - lazy import to prevent module load crashes
app.all('/api/auth/*', async (req, res) => {
    try {
        const { toNodeHandler } = await import('better-auth/node');
        const { auth } = await import('../apps/api/src/lib/auth.js');
        return toNodeHandler(auth)(req, res);
    } catch (error: any) {
        console.error('Better Auth error:', error);
        res.status(500).json({ error: error?.message || 'Auth Error' });
    }
});

app.use(express.json());
app.use(cookieParser());

// Mount public routes
app.use('/api', publicRoutes);
app.use('/', publicRoutes);

// Mount admin routes with lazy requireAuth
app.use('/api/admin', async (req, res, next) => {
    try {
        const { requireAuth } = await import('../apps/api/src/middleware/requireAuth.js');
        const { default: adminRoutes } = await import('../apps/api/src/routes/adminRoutes.js');
        return requireAuth(req, res, () => adminRoutes(req, res, next));
    } catch (error: any) {
        console.error('Admin route error:', error);
        res.status(500).json({ error: error?.message || 'Admin Route Error' });
    }
});

app.get(['/api/health', '/health'], (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled API Error:', err);
    res.status(500).json({ error: err?.message || 'Internal Server Error', details: String(err) });
});

export default app;
