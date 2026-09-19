const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

module.exports = sanitizeUser;
