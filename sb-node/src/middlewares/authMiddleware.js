const AppError = require("../utils/AppError");
const User = require("../models/User");
const sanitizeUser = require("../utils/sanitizeUser");
const { verifyAccessToken } = require("../utils/token");
const { ACCESS_TOKEN_COOKIE } = require("../utils/cookies");

const extractAccessToken = (req) => {
  if (req.cookies && req.cookies[ACCESS_TOKEN_COOKIE]) {
    return req.cookies[ACCESS_TOKEN_COOKIE];
  }

  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  return null;
};

const authMiddleware = async (req, _res, next) => {
  try {
    const token = extractAccessToken(req);

    if (!token) {
      throw new AppError("Authentication is required", 401);
    }

    let payload;

    try {
      payload = verifyAccessToken(token);
    } catch (_error) {
      throw new AppError("Access token is invalid or expired", 401);
    }

    const user = await User.findById(payload.sub);

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    req.user = sanitizeUser(user);
    req.auth = {
      token,
      payload,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
