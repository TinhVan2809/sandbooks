const db = require("../config/database");

const findMany = async () => db.query(
  `SELECT author_id AS id, author_name AS name
   FROM authors
   ORDER BY author_name ASC`,
);

const create = async (name) => {
  const result = await db.execute(
    "INSERT INTO authors (author_name) VALUES (?)",
    [name.trim()],
  );

  const rows = await db.query(
    "SELECT author_id AS id, author_name AS name FROM authors WHERE author_id = ?",
    [result.insertId],
  );

  return rows[0];
};

module.exports = { findMany, create };