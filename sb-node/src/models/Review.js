const db = require("../config/database");

const normalizeReviewRow = (row) => {
  if (!row) {
    return null;
  }

  return {
    reviewId: row.review_id,
    bookId: row.book_id,
    userId: row.user_id,
    rating: Number(row.rating),
    comment: row.comment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    user: {
      id: row.user_id,
      username: row.username,
      nickname: row.nickname,
      role: row.role || "user",
    },
    bookTitle: row.book_title || undefined,
  };
};

const findMany = async ({ bookId, limit = 50, offset = 0 } = {}) => {
  const clauses = [];
  const params = [];

  if (bookId) {
    clauses.push("r.book_id = ?");
    params.push(bookId);
  }

  const whereSql = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const parsedLimit = Math.max(1, Math.min(Number(limit) || 50, 100));
  const parsedOffset = Math.max(0, Number(offset) || 0);

  params.push(parsedLimit, parsedOffset);

  const rows = await db.query(
    `SELECT 
      r.review_id,
      r.book_id,
      r.user_id,
      r.rating,
      r.comment,
      r.created_at,
      r.updated_at,
      u.username,
      u.nickname,
      u.role,
      b.title AS book_title
    FROM book_reviews r
    JOIN auth_users u ON u.id = r.user_id
    JOIN books b ON b.book_id = r.book_id
    ${whereSql}
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?`,
    params
  );

  return rows.map(normalizeReviewRow);
};

const findById = async (reviewId) => {
  const rows = await db.query(
    `SELECT 
      r.review_id,
      r.book_id,
      r.user_id,
      r.rating,
      r.comment,
      r.created_at,
      r.updated_at,
      u.username,
      u.nickname,
      u.role,
      b.title AS book_title
    FROM book_reviews r
    JOIN auth_users u ON u.id = r.user_id
    JOIN books b ON b.book_id = r.book_id
    WHERE r.review_id = ?
    LIMIT 1`,
    [reviewId]
  );

  return normalizeReviewRow(rows[0]);
};

const findByUserAndBook = async (userId, bookId) => {
  const rows = await db.query(
    `SELECT 
      r.review_id,
      r.book_id,
      r.user_id,
      r.rating,
      r.comment,
      r.created_at,
      r.updated_at,
      u.username,
      u.nickname,
      u.role
    FROM book_reviews r
    JOIN auth_users u ON u.id = r.user_id
    WHERE r.user_id = ? AND r.book_id = ?
    LIMIT 1`,
    [userId, bookId]
  );

  return normalizeReviewRow(rows[0]);
};

const create = async ({ bookId, userId, rating, comment }) => {
  const result = await db.execute(
    `INSERT INTO book_reviews (book_id, user_id, rating, comment)
     VALUES (?, ?, ?, ?)`,
    [bookId, userId, rating, comment]
  );

  return findById(result.insertId);
};

const deleteById = async (reviewId) => {
  const result = await db.execute(
    "DELETE FROM book_reviews WHERE review_id = ?",
    [reviewId]
  );

  return result.affectedRows > 0;
};

module.exports = {
  findMany,
  findById,
  findByUserAndBook,
  create,
  deleteById,
};
