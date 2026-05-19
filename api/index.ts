import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '../apps/api/src/lib/auth.js';
import { requireAuth } from '../apps/api/src/middleware/requireAuth.js';
import publicRoutes from '../apps/api/src/routes/publicRoutes.js';
import adminRoutes from '../apps/api/src/routes/adminRoutes.js';

const app = express();

// CORS — allow frontend origin with credentials
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
    origin: corsOrigin,
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

export default app;
