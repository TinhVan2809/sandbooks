const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config/env");

const durationToMs = (duration) => {
  if (typeof duration === "number") {
    return duration * 1000;
  }

  const value = String(duration).trim();

  if (/^\d+$/.test(value)) {
    return Number(value) * 1000;
  }

  const match = value.match(/^(\d+)(ms|s|m|h|d)$/);

  if (!match) {
    throw new Error(`Unsupported duration format: ${duration}`);
  }

  const amount = Number(match[1]);
  const unit = match[2];
  const multipliers = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * multipliers[unit];
};

const buildUserPayload = (user) => ({
  sub: String(user.id),
  username: user.username,
  nickname: user.nickname,
});

const signAccessToken = (user) =>
  jwt.sign(buildUserPayload(user), config.auth.accessTokenSecret, {
    expiresIn: config.auth.accessTokenExpiresIn,
  });

const signRefreshToken = (user) =>
  jwt.sign({ sub: String(user.id) }, config.auth.refreshTokenSecret, {
    expiresIn: config.auth.refreshTokenExpiresIn,
    jwtid: crypto.randomUUID(),
  });

const verifyAccessToken = (token) => jwt.verify(token, config.auth.accessTokenSecret);

const verifyRefreshToken = (token) => jwt.verify(token, config.auth.refreshTokenSecret);

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const getRefreshTokenExpiresAt = () =>
  new Date(Date.now() + durationToMs(config.auth.refreshTokenExpiresIn));

module.exports = {
  durationToMs,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
  getRefreshTokenExpiresAt,
};
