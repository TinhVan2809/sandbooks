const db = require("../config/database");

const normalizeBookRow = (row) => {
  if (!row) {
    return null;
  }

  return {
    id: row.book_id,
    title: row.title,
    isbn: row.ISBN,
    publisherYear: row.publisher_year,
    language: row.language,
    description: row.description,
    status: row.status,
    author: row.author_id
      ? {
        id: row.author_id,
        name: row.author_name,
      }
      : null,
    publisher: row.publisher_id
      ? {
        id: row.publisher_id,
        name: row.publisher_name,
      }
      : null,
    category: row.category_id
      ? {
        id: row.category_id,
        name: row.category_name,
      }
      : null,
    thumbnailUrl: row.thumbnail_url || null,
    rating: Number(row.rating || 0),
    ratingCount: Number(row.rating_count || 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const normalizeImageRow = (row) => ({
  id: row.img_id,
  url: row.image_url,
  isThumbnail: Boolean(row.is_thumbnail),
});

const getBaseSelect = () => `
  SELECT
    b.book_id,
    b.title,
    b.ISBN,
    b.publisher_year,
    b.language,
    b.description,
    b.status,
    NULL AS created_at,
    NULL AS updated_at,
    a.author_id,
    a.author_name,
    p.publisher_id,
    p.publisher_name,
    c.category_id,
    c.category_name,
    thumb.image_url AS thumbnail_url,
    COALESCE(review_stats.rating, 0) AS rating,
    COALESCE(review_stats.rating_count, 0) AS rating_count
  FROM books b
  LEFT JOIN authors a ON a.author_id = b.author_id
  LEFT JOIN publisher p ON p.publisher_id = b.publisher_id
  LEFT JOIN book_categories bc ON bc.book_id = b.book_id
  LEFT JOIN categories c ON c.category_id = bc.category_id
  LEFT JOIN book_img thumb ON thumb.book_id = b.book_id AND thumb.is_thumbnail = 1
  LEFT JOIN (
    SELECT
      book_id,
      AVG(rating) AS rating,
      COUNT(*) AS rating_count
    FROM book_reviews
    GROUP BY book_id
  ) review_stats ON review_stats.book_id = b.book_id
`;

const buildListWhere = ({ search, authorId, publisherId, language, categoryId }) => {
  const clauses = [];
  const params = [];

  if (search) {
    clauses.push("(b.title LIKE ? OR b.ISBN LIKE ? OR a.author_name LIKE ? OR p.publisher_name LIKE ?)");
    const keyword = `%${search}%`;
    params.push(keyword, keyword, keyword, keyword);
  }

  if (authorId) {
    clauses.push("b.author_id = ?");
    params.push(authorId);
  }

  if (publisherId) {
    clauses.push("b.publisher_id = ?");
    params.push(publisherId);
  }

  if (language) {
    clauses.push("b.language = ?");
    params.push(language);
  }

  if (categoryId) {
    clauses.push("bc.category_id = ?");
    params.push(categoryId);
  }

  return {
    whereSql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "",
    params,
  };
};

const findMany = async ({ page, limit, search, authorId, publisherId, language, categoryId }) => {
  const offset = (page - 1) * limit;
  const { whereSql, params } = buildListWhere({ search, authorId, publisherId, language, categoryId });
  const rows = await db.query(
    `${getBaseSelect()}
     ${whereSql}
     ORDER BY b.book_id DESC
     LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  );

  return rows.map(normalizeBookRow);
};

/**
 * Sách có nhiều đánh giá nhất (sắp xếp theo số lượng review DESC)
 */
const findMostReviewed = async (limit = 10) => {
  const rows = await db.query(
    `${getBaseSelect()}
     WHERE review_stats.rating_count > 0
     ORDER BY review_stats.rating_count DESC, review_stats.rating DESC
     LIMIT ?`,
    [limit],
  );

  return rows.map(normalizeBookRow);
};

/**
 * Sách mới nhất (sắp xếp theo ngày tạo DESC)
 */
const findNewest = async (limit = 10) => {
  const rows = await db.query(
    `${getBaseSelect()}
     ORDER BY b.created_at DESC
     LIMIT ?`,
    [limit],
  );

  return rows.map(normalizeBookRow);
};

/**
 * Sách được đề xuất (rating cao, ít nhất 1 review, sắp xếp theo rating DESC)
 */
const findRecommended = async (limit = 10) => {
  const rows = await db.query(
    `${getBaseSelect()}
     WHERE review_stats.rating_count > 0
     ORDER BY review_stats.rating DESC, review_stats.rating_count DESC
     LIMIT ?`,
    [limit],
  );

  return rows.map(normalizeBookRow);
};

const countMany = async ({ search, authorId, publisherId, language, categoryId }) => {
  const { whereSql, params } = buildListWhere({ search, authorId, publisherId, language, categoryId });
  const rows = await db.query(
    `SELECT COUNT(*) AS total
     FROM books b
     LEFT JOIN authors a ON a.author_id = b.author_id
     LEFT JOIN publisher p ON p.publisher_id = b.publisher_id
     LEFT JOIN book_categories bc ON bc.book_id = b.book_id
     ${whereSql}`,
    params,
  );

  return Number(rows[0].total);
};

const findById = async (bookId) => {
  const rows = await db.query(
    `${getBaseSelect()}
     WHERE b.book_id = ?
     LIMIT 1`,
    [bookId],
  );
  const book = normalizeBookRow(rows[0]);

  if (!book) {
    return null;
  }

  const images = await db.query(
    `SELECT img_id, image_url, is_thumbnail
     FROM book_img
     WHERE book_id = ?
     ORDER BY is_thumbnail DESC, img_id ASC`,
    [bookId],
  );

  return {
    ...book,
    images: images.map(normalizeImageRow),
  };
};

const findAuthorById = async (connection, authorId) => {
  const [rows] = await connection.execute(
    "SELECT author_id AS id FROM authors WHERE author_id = ? LIMIT 1",
    [authorId],
  );

  return rows[0] || null;
};

const findPublisherById = async (connection, publisherId) => {
  const [rows] = await connection.execute(
    "SELECT publisher_id AS id FROM publisher WHERE publisher_id = ? LIMIT 1",
    [publisherId],
  );

  return rows[0] || null;
};

const findOrCreateAuthor = async (connection, authorName) => {
  const name = authorName.trim();
  const [existingRows] = await connection.execute(
    "SELECT author_id AS id FROM authors WHERE LOWER(author_name) = LOWER(?) LIMIT 1",
    [name],
  );

  if (existingRows[0]) {
    return existingRows[0].id;
  }

  const [result] = await connection.execute("INSERT INTO authors (author_name) VALUES (?)", [name]);

  return result.insertId;
};

const findOrCreatePublisher = async (connection, publisherName) => {
  const name = publisherName.trim();
  const [existingRows] = await connection.execute(
    "SELECT publisher_id AS id FROM publisher WHERE LOWER(publisher_name) = LOWER(?) LIMIT 1",
    [name],
  );

  if (existingRows[0]) {
    return existingRows[0].id;
  }

  const [result] = await connection.execute("INSERT INTO publisher (publisher_name) VALUES (?)", [name]);

  return result.insertId;
};

const normalizePublisherYear = (publisherYear) => {
  if (!publisherYear) {
    return null;
  }

  const year = String(publisherYear).trim();

  return /^\d{4}$/.test(year) ? `${year}-01-01` : year;
};

const create = async ({
  title,
  isbn,
  authorId,
  authorName,
  publisherId,
  publisherName,
  publisherYear,
  language,
  description,
  images,
}) => {
  const bookId = await db.withTransaction(async (connection) => {
    let resolvedAuthorId = authorId || null;
    let resolvedPublisherId = publisherId || null;

    if (resolvedAuthorId) {
      const author = await findAuthorById(connection, resolvedAuthorId);

      if (!author) {
        const error = new Error("Author not found");
        error.status = 404;
        throw error;
      }
    } else if (authorName) {
      resolvedAuthorId = await findOrCreateAuthor(connection, authorName);
    }

    if (resolvedPublisherId) {
      const publisher = await findPublisherById(connection, resolvedPublisherId);

      if (!publisher) {
        const error = new Error("Publisher not found");
        error.status = 404;
        throw error;
      }
    } else if (publisherName) {
      resolvedPublisherId = await findOrCreatePublisher(connection, publisherName);
    }

    const [result] = await connection.execute(
      `INSERT INTO books
        (title, ISBN, author_id, publisher_id, publisher_year, language, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        isbn.trim(),
        resolvedAuthorId,
        resolvedPublisherId,
        normalizePublisherYear(publisherYear),
        language ? language.trim() : null,
        description ? description.trim() : null,
      ],
    );

    for (const image of images || []) {
      await connection.execute(
        `INSERT INTO book_img (book_id, image_url, is_thumbnail)
         VALUES (?, ?, ?)`,
        [result.insertId, image.url.trim(), image.isThumbnail ? 1 : 0],
      );
    }

    return result.insertId;
  });

  return findById(bookId);
};

const saveBook = async (userId, bookId) => {
  await db.execute(
    "INSERT IGNORE INTO book_save (user_id, book_id) VALUES (?, ?)",
    [userId, bookId]
  );
  return true;
};

const unsaveBook = async (userId, bookId) => {
  await db.execute(
    "DELETE FROM book_save WHERE user_id = ? AND book_id = ?",
    [userId, bookId]
  );
  return true;
};

const findSavedBooks = async (userId) => {
  const rows = await db.query(
    `${getBaseSelect()}
     INNER JOIN book_save bs ON bs.book_id = b.book_id
     WHERE bs.user_id = ?
     ORDER BY bs.created_at DESC`,
    [userId]
  );
  return rows.map(normalizeBookRow);
};

module.exports = {
  findMany,
  countMany,
  findById,
  findMostReviewed,
  findNewest,
  findRecommended,
  create,
  saveBook,
  unsaveBook,
  findSavedBooks,
};
