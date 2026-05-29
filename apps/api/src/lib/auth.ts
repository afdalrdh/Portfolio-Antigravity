import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer } from 'better-auth/plugins';
import { db } from '../db/index.js';
import * as schema from '../db/schema/index.js';

const defaultBase = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://afdalrdh.com';
const authBase = process.env.BETTER_AUTH_URL || defaultBase;
const baseURL = authBase.endsWith('/api/auth') ? authBase : `${authBase}/api/auth`;

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
        cookieOptions: {
            sameSite: "none",
            secure: true,
        },
    },
    plugins: [
        bearer()
    ]
});
