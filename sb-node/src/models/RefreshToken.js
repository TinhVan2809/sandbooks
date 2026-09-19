const db = require("../config/database");

const create = async ({ userId, tokenHash, expiresAt, userAgent, ipAddress }) => {
  await db.execute(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at, user_agent, ip_address)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, tokenHash, expiresAt, userAgent || null, ipAddress || null],
  );
};

const findValidByHash = async (tokenHash) => {
  const rows = await db.execute(
    `SELECT id, user_id AS userId, token_hash AS tokenHash, expires_at AS expiresAt
     FROM refresh_tokens
     WHERE token_hash = ?
       AND revoked_at IS NULL
       AND expires_at > NOW()
     LIMIT 1`,
    [tokenHash],
  );

  return rows[0] || null;
};

const revokeByHash = async (tokenHash) => {
  await db.execute(
    `UPDATE refresh_tokens
     SET revoked_at = NOW()
     WHERE token_hash = ? AND revoked_at IS NULL`,
    [tokenHash],
  );
};

const revokeAllForUser = async (userId) => {
  await db.execute(
    `UPDATE refresh_tokens
     SET revoked_at = NOW()
     WHERE user_id = ? AND revoked_at IS NULL`,
    [userId],
  );
};

module.exports = {
  create,
  findValidByHash,
  revokeByHash,
  revokeAllForUser,
};
