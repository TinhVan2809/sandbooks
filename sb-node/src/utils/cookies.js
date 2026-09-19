const config = require("../config/env");
const { durationToMs } = require("./token");

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

const baseCookieOptions = {
  httpOnly: true,
  secure: config.cookie.secure,
  sameSite: config.cookie.sameSite,
};

const accessCookieOptions = {
  ...baseCookieOptions,
  path: "/",
  maxAge: durationToMs(config.auth.accessTokenExpiresIn),
};

const refreshCookieOptions = {
  ...baseCookieOptions,
  path: "/api/auth",
  maxAge: durationToMs(config.auth.refreshTokenExpiresIn),
};

const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessCookieOptions);
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshCookieOptions);
};

const clearAuthCookies = (res) => {
  res.clearCookie(ACCESS_TOKEN_COOKIE, {
    ...baseCookieOptions,
    path: "/",
  });
  res.clearCookie(REFRESH_TOKEN_COOKIE, {
    ...baseCookieOptions,
    path: "/api/auth",
  });
};

module.exports = {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  setAuthCookies,
  clearAuthCookies,
};
