const AppError = require("../utils/AppError");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const { hashPassword, comparePassword } = require("../utils/password");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  getRefreshTokenExpiresAt,
} = require("../utils/token");
const sanitizeUser = require("../utils/sanitizeUser");

const isDuplicateEntryError = (error) => error && error.code === "ER_DUP_ENTRY";

const issueTokenPair = async (user, meta = {}) => {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  await RefreshToken.create({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: getRefreshTokenExpiresAt(),
    userAgent: meta.userAgent,
    ipAddress: meta.ipAddress,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const register = async ({ username, nickname, password }) => {
  const normalizedUsername = username.trim();
  const normalizedNickname = nickname.trim();
  const existingUsername = await User.findByUsername(normalizedUsername);

  if (existingUsername) {
    throw new AppError("Username already exists", 409);
  }

  const passwordHash = await hashPassword(password);

  try {
    const user = await User.create({
      username: normalizedUsername,
      nickname: normalizedNickname,
      passwordHash,
    });

    return sanitizeUser(user);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new AppError("Username already exists", 409);
    }

    throw error;
  }
};

const login = async ({ username, password }, meta = {}) => {
  const user = await User.findByUsername(username.trim());

  if (!user) {
    throw new AppError("Username or password is incorrect", 401);
  }

  const passwordMatches = await comparePassword(password, user.passwordHash);

  if (!passwordMatches) {
    throw new AppError("Username or password is incorrect", 401);
  }

  const tokens = await issueTokenPair(user, meta);

  return {
    user: sanitizeUser(user),
    tokens,
  };
};

const refresh = async (refreshToken, meta = {}) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (_error) {
    throw new AppError("Refresh token is invalid or expired", 401);
  }

  const tokenHash = hashToken(refreshToken);
  const storedToken = await RefreshToken.findValidByHash(tokenHash);

  if (!storedToken) {
    throw new AppError("Refresh token is invalid or revoked", 401);
  }

  const user = await User.findById(payload.sub);

  if (!user) {
    await RefreshToken.revokeByHash(tokenHash);
    throw new AppError("User no longer exists", 401);
  }

  await RefreshToken.revokeByHash(tokenHash);

  const tokens = await issueTokenPair(user, meta);

  return {
    user: sanitizeUser(user),
    tokens,
  };
};

const logout = async (refreshToken) => {
  if (refreshToken) {
    await RefreshToken.revokeByHash(hashToken(refreshToken));
  }
};

const logoutAll = async (userId) => {
  await RefreshToken.revokeAllForUser(userId);
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  logoutAll,
};
