export default async function handler(req: any, res: any) {
    try {
        // Dynamically import everything so top-level errors are caught!
        await import('dotenv/config');
        const express = (await import('express')).default;
        const cors = (await import('cors')).default;
        const cookieParser = (await import('cookie-parser')).default;
        const { toNodeHandler } = await import('better-auth/node');
        const { auth } = await import('../apps/api/src/lib/auth.js');
        const { requireAuth } = await import('../apps/api/src/middleware/requireAuth.js');
        const publicRoutes = (await import('../apps/api/src/routes/publicRoutes.js')).default;
        const adminRoutes = (await import('../apps/api/src/routes/adminRoutes.js')).default;

        const app = express();

        const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
        app.use(cors({
            origin: corsOrigin,
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Better-Auth-Token'],
            exposedHeaders: ['set-auth-token'],
        }));

        app.all('/api/auth/*', toNodeHandler(auth));
        app.use(express.json());
        app.use(cookieParser());

        app.use('/api', publicRoutes);
        app.use('/api/admin', requireAuth, adminRoutes);

        app.get('/api/health', (_req: any, r: any) => {
            r.json({ status: 'ok', timestamp: new Date().toISOString() });
        });

        return app(req, res);
    } catch (error: any) {
        console.error("Vercel Startup Error Caught:", error);
        if (res.status && res.json) {
            return res.status(500).json({
                error: "FUNCTION_INVOCATION_FAILED_CATCHED",
                message: error.message,
                stack: error.stack,
            });
        } else {
            // Fallback if Vercel doesn't pass Express-like res
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                error: "FUNCTION_INVOCATION_FAILED_CATCHED",
                message: error.message,
                stack: error.stack,
            }));
        }
    }
}
