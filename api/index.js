try {
  // Try to load the compiled app.ts
  const appModule = require('./app.ts');
  module.exports = appModule.default || appModule;
} catch (error) {
  // If it fails to compile or load, return the error to the client
  console.error("Vercel Startup Error:", error);
  module.exports = function (req, res) {
    res.status(500).json({
      error: "FUNCTION_INVOCATION_FAILED_CATCHED",
      message: error.message,
      stack: error.stack,
    });
  };
}
