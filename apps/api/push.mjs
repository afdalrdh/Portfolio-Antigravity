// Script to push schema using drizzle-kit programmatically
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiDir = __dirname;

// Run drizzle-kit push with the correct NODE_PATH so it can find drizzle-orm
execSync(`node ${path.join(apiDir, 'node_modules/drizzle-kit/bin.cjs')} push --config=${path.join(apiDir, 'drizzle.config.ts')}`, {
    cwd: apiDir,
    stdio: 'inherit',
    env: {
        ...process.env,
        NODE_PATH: path.join(apiDir, 'node_modules'),
    },
});
