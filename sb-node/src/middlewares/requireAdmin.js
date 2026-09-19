const AppError = require("../utils/AppError");

const requireAdmin = (req, _res, next) => {
  if (!req.user) {
    return next(new AppError("Authentication is required", 401));
  }

  if (req.user.role !== "admin") {
    return next(new AppError("Admin permission is required", 403));
  }

  return next();
};

module.exports = requireAdmin;
