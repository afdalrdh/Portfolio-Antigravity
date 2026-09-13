import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import publicRoutes from './src/routes/publicRoutes.js';

const app = express();

// CORS
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Better-Auth-Token'],
    exposedHeaders: ['set-auth-token'],
}));

// Better Auth handler
app.all('/api/auth/*', async (req, res) => {
    try {
        const { toNodeHandler } = await import('better-auth/node');
        const { auth } = await import('./src/lib/auth.js');
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

// Mount admin routes
app.use('/api/admin', async (req, res, next) => {
    try {
        const { requireAuth } = await import('./src/middleware/requireAuth.js');
        const { default: adminRoutes } = await import('./src/routes/adminRoutes.js');
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
