import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer } from 'better-auth/plugins';
import { db } from '../db/index.js';
import * as schema from '../db/schema/index.js';

const authBase = process.env.BETTER_AUTH_URL || '';
const baseURL = authBase.endsWith('/api/auth') ? authBase : `${authBase}/api/auth`;

const isProd = process.env.NODE_ENV === 'production' || (process.env.CORS_ORIGIN && process.env.CORS_ORIGIN.startsWith('https://'));

export const auth = betterAuth({
    baseURL,
    // @ts-ignore - Vercel strict TS complains but this works at runtime
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [process.env.CORS_ORIGIN || 'http://localhost:5173'],
    advanced: {
        defaultCookieAttributes: {
            sameSite: isProd ? "none" : "lax",
            secure: isProd ? true : false,
        },
    },
    plugins: [
        bearer()
    ]
});
