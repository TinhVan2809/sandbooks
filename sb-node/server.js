const http = require("http");
const { createApp } = require("./src/app");
const config = require("./src/config/env");
const {
  checkDatabaseConnection,
  closeDatabaseConnection,
} = require("./src/config/database");

const startServer = async () => {
  try {
    await checkDatabaseConnection();

    const app = createApp();
    const httpServer = http.createServer(app);

    const server = httpServer.listen(config.app.port, () => {
      console.log(`Server is running at ${config.app.port}`);
      console.log(`http://localhost:${config.app.port}`);
    });

    return server;
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.code || error.message || error.name,
    );
    process.exit(1);
  }
};

const app = createApp();

if (require.main === module) {
  const server = startServer();

  const shutdown = async (signal) => {
    console.log(`${signal} received, closing server`);
    const runningServer = await server;

    runningServer.close(async () => {
      await closeDatabaseConnection();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}


module.exports = {
  app,
  createApp,
  startServer,
};
