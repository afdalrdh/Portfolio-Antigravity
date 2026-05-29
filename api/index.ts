export default async function handler(req: any, res: any) {
    try {
        const appModule = await import('./app.js');
        const app = appModule.default || appModule;
        return app(req, res);
    } catch (error: any) {
        console.error("Vercel Startup Error:", error);
        return res.status(500).json({
            error: "FUNCTION_INVOCATION_FAILED_CATCHED",
            message: error.message,
            stack: error.stack,
        });
    }
}
