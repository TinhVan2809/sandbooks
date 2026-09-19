const db = require("../config/database");

const USER_COLUMNS = `
  id,
  username,
  nickname,
  password_hash AS passwordHash,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

const findById = async (id) => {
  const rows = await db.execute(`SELECT ${USER_COLUMNS} FROM auth_users WHERE id = ? LIMIT 1`, [id]);

  return rows[0] || null;
};

const findByUsername = async (username) => {
  const rows = await db.execute(
    `SELECT ${USER_COLUMNS} FROM auth_users WHERE LOWER(username) = LOWER(?) LIMIT 1`,
    [username],
  );

  return rows[0] || null;
};

const create = async ({ username, nickname, passwordHash }) => {
  const result = await db.execute(
    `INSERT INTO auth_users (username, nickname, password_hash)
     VALUES (?, ?, ?)`,
    [username, nickname, passwordHash],
  );

  return findById(result.insertId);
};

module.exports = {
  findById,
  findByUsername,
  create,
};
