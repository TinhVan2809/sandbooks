const db = require("../config/database");

const findMany = async () => db.query(
  `SELECT category_id AS id, category_name AS name, description
   FROM categories
   ORDER BY category_name ASC`
);

module.exports = { findMany };
