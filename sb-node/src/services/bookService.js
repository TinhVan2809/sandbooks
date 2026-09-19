const AppError = require("../utils/AppError");
const Book = require("../models/Book");

const toPositiveInteger = (value, fallback, max) => {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return max ? Math.min(parsed, max) : parsed;
};

const listBooks = async (query) => {
  const page = toPositiveInteger(query.page, 1);
  const limit = toPositiveInteger(query.limit, 10, 50);
  const filters = {
    page,
    limit,
    search: query.search ? query.search.trim() : "",
    authorId: query.authorId ? toPositiveInteger(query.authorId, null) : null,
    publisherId: query.publisherId ? toPositiveInteger(query.publisherId, null) : null,
    language: query.language ? query.language.trim() : "",
  };

  const [items, total] = await Promise.all([Book.findMany(filters), Book.countMany(filters)]);
  const totalPages = Math.ceil(total / limit) || 1;

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

const createBook = async (payload) => {
  try {
    return await Book.create(payload);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new AppError("ISBN already exists", 409);
    }

    if (error.status) {
      throw new AppError(error.message, error.status);
    }

    throw error;
  }
};

module.exports = {
  listBooks,
  createBook,
};
