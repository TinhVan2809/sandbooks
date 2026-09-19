const AppError = require("../utils/AppError");

const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
};

const normalizeError = (error) => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return new AppError("Invalid JSON body", 400);
  }

  if (error.message && error.message.startsWith("Not allowed by CORS")) {
    return new AppError(error.message, 403);
  }

  return error;
};

const errorHandler = (error, _req, res, _next) => {
  const normalizedError = normalizeError(error);
  const status = normalizedError.status || normalizedError.statusCode || 500;
  const response = {
    success: false,
    message: status >= 500 ? "Internal server error" : normalizedError.message,
  };

  if (normalizedError.details) {
    response.errors = normalizedError.details;
  }

  if (process.env.NODE_ENV !== "production" && status >= 500) {
    response.stack = normalizedError.stack;
  }

  res.status(status).json(response);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
