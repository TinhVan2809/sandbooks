const db = require("../config/database");

const findMany = async () => db.query(
  `SELECT publisher_id AS id, publisher_name AS name
   FROM publisher
   ORDER BY publisher_name ASC`,
);

const create = async (name) => {
  const result = await db.execute(
    "INSERT INTO publisher (publisher_name) VALUES (?)",
    [name.trim()],
  );

  const rows = await db.query(
    "SELECT publisher_id AS id, publisher_name AS name FROM publisher WHERE publisher_id = ?",
    [result.insertId],
  );

  return rows[0];
};

module.exports = { findMany, create };