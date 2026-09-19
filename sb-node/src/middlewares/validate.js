const AppError = require("../utils/AppError");

const usernameRegex = /^[A-Za-z0-9_]{3,30}$/;

const failValidation = (errors) => {
  throw new AppError("Validation failed", 422, errors);
};

const validateRegister = (req, _res, next) => {
  try {
    const errors = [];
    const { username, nickname, password } = req.body || {};

    if (!username || typeof username !== "string" || !usernameRegex.test(username.trim())) {
      errors.push({
        field: "username",
        message: "Username must be 3-30 characters and contain only letters, numbers, or underscore",
      });
    }

    if (!nickname || typeof nickname !== "string" || !nickname.trim() || nickname.trim().length > 50) {
      errors.push({
        field: "nickname",
        message: "Nickname is required and must be at most 50 characters",
      });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      errors.push({
        field: "password",
        message: "Password must be at least 8 characters",
      });
    }

    if (errors.length) {
      failValidation(errors);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateLogin = (req, _res, next) => {
  try {
    const errors = [];
    const { username, password } = req.body || {};

    if (!username || typeof username !== "string" || !username.trim()) {
      errors.push({
        field: "username",
        message: "Username is required",
      });
    }

    if (!password || typeof password !== "string") {
      errors.push({
        field: "password",
        message: "Password is required",
      });
    }

    if (errors.length) {
      failValidation(errors);
    }

    req.body.username = username.trim();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateRegister,
  validateLogin,
};
