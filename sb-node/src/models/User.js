const db = require("../config/database");

let hasRoleColumn = null;

const checkRoleColumn = async () => {
  if (hasRoleColumn !== null) {
    return hasRoleColumn;
  }

  const rows = await db.query("SHOW COLUMNS FROM auth_users LIKE 'role'");
  hasRoleColumn = rows.length > 0;

  return hasRoleColumn;
};

const getUserColumns = async () => {
  const roleSelect = (await checkRoleColumn()) ? "role," : "'user' AS role,";

  return `
    id,
    username,
    nickname,
    ${roleSelect}
    password_hash AS passwordHash,
    created_at AS createdAt,
    updated_at AS updatedAt
  `;
};

const findById = async (id) => {
  const userColumns = await getUserColumns();
  const rows = await db.execute(`SELECT ${userColumns} FROM auth_users WHERE id = ? LIMIT 1`, [id]);

  return rows[0] || null;
};

const findByUsername = async (username) => {
  const userColumns = await getUserColumns();
  const rows = await db.execute(
    `SELECT ${userColumns} FROM auth_users WHERE LOWER(username) = LOWER(?) LIMIT 1`,
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
