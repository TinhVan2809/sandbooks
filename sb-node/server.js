require("dotenv").config();
const express = require("express");
const http = require("http"); 
const jwt = require("jsonwebtoken");
const cors = require("cors");
const config = require("./config/env");
const cookieParser = require("cookie-parser");
const path = require("path");
const {
  checkDatabaseConnection,
  closeDatabaseConnection,
} = require("./config/database");


const createApp = () => {
  const app = express();

  // Fall back to common localhost origins for development
  const allowedOrigins = [
    ...(config.cors.origins || []),
    config.app.frontendUrl,
    "http://localhost:5173",
    "http://localhost:3000",
  ].filter(Boolean);

  console.log('Allowed origins:', allowedOrigins);

  const corsOptions = {
    origin: function (origin, callback) {
      console.log('CORS request from origin:', origin);
      
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        console.log('No origin - allowing');
        return callback(null, true);
      }
      
      // Allow all Vercel deployment URLs
      if (origin.endsWith('.vercel.app')) {
        console.log('Vercel domain - allowing:', origin);
        return callback(null, true);
      }
      
      // Check against allowed origins list
      if (allowedOrigins.indexOf(origin) !== -1) {
        console.log('In allowed list - allowing:', origin);
        return callback(null, true);
      }
      
      console.log("Blocked by CORS:", origin);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Cache-Control"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));

  // Debug middleware - log all requests
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Origin:', req.get('Origin'));
    console.log('Headers:', req.headers);
    next();
  });

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Emlovy API is running",
    });
  });

  app.get("/health/db", async (req, res, next) => {
    try {
      await checkDatabaseConnection();

      res.status(200).json({
        success: true,
        status: "ok",
        database: "connected",
      });
    } catch (error) {
      const databaseError = new Error("Database unavailable");
      databaseError.status = 503;
      databaseError.cause = error;
      next(databaseError);
    }
  });

//   app.use("/api/auth", authRoutes);

  return app;
};

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

// Export app instance for Vercel serverless functions
const app = createApp();

if (require.main === module) {
  startServer();
}


module.exports = {
  app,
  createApp,
  startServer,
};