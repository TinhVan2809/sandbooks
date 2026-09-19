const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/env");
const { checkDatabaseConnection } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");

const buildAllowedOrigins = () => [
  ...(config.cors.origins || []),
  config.app.frontendUrl,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

const createCorsOptions = () => {
  const allowedOrigins = buildAllowedOrigins();

  return {
    origin(origin, callback) {
      if (!origin || origin.endsWith(".vercel.app") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Cache-Control"],
    optionsSuccessStatus: 204,
  };
};

const createApp = () => {
  const app = express();

  app.set("trust proxy", 1);
  app.use(cors(createCorsOptions()));

  if (!config.isProduction) {
    app.use((req, _res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Sandbooks API is running",
    });
  });

  app.get("/health/db", async (_req, res, next) => {
    try {
      await checkDatabaseConnection();

      res.status(200).json({
        success: true,
        status: "ok",
        database: "connected",
      });
    } catch (error) {
      error.status = 503;
      error.message = "Database unavailable";
      next(error);
    }
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/books", bookRoutes);
  app.use("/api", catalogRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

module.exports = {
  createApp,
};
