const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/authService");
const { setAuthCookies, clearAuthCookies, REFRESH_TOKEN_COOKIE } = require("../utils/cookies");

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get("user-agent") || "",
});

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "Register successfully",
    data: {
      user,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { user, tokens } = await authService.login(req.body, getRequestMeta(req));

  setAuthCookies(res, tokens);

  res.status(200).json({
    success: true,
    message: "Login successfully",
    data: {
      user,
    },
  });
});

const refresh = asyncHandler(async (req, res) => {
  const { user, tokens } = await authService.refresh(
    req.cookies[REFRESH_TOKEN_COOKIE],
    getRequestMeta(req),
  );

  setAuthCookies(res, tokens);

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: {
      user,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.cookies[REFRESH_TOKEN_COOKIE]);
  clearAuthCookies(res);

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

module.exports = {
  register,
  login,
  refresh,
  logout,
  me,
};
