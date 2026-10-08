const AppError = require("../utils/AppError");
const Book = require("../models/Book");

const toPositiveInteger = (value, fallback, max) => {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return max ? Math.min(parsed, max) : parsed;
};

const toSearchText = (value) => (typeof value === "string" ? value.trim() : "");

const listBooks = async (query) => {
  const page = toPositiveInteger(query.page, 1);
  const limit = toPositiveInteger(query.limit, 10, 50);
  const filters = {
    page,
    limit,
    search: toSearchText(query.search),
    name: toSearchText(query.name),
    author: toSearchText(query.author ?? query.auhtor),
    category: toSearchText(query.category),
    authorId: query.authorId ? toPositiveInteger(query.authorId, null) : null,
    publisherId: query.publisherId ? toPositiveInteger(query.publisherId, null) : null,
    language: toSearchText(query.language),
    categoryId: query.categoryId ? toPositiveInteger(query.categoryId, null) : null,
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

const getBookById = async (bookId) => {
  const parsedBookId = toPositiveInteger(bookId, null);

  if (!parsedBookId) {
    throw new AppError("Invalid book ID", 400);
  }

  return Book.findById(parsedBookId);
};

const getMostReviewedBooks = async (query) => {
  const limit = toPositiveInteger(query.limit, 8, 50);

  return Book.findMostReviewed(limit);
};

const getNewestBooks = async (query) => {
  const limit = toPositiveInteger(query.limit, 10, 50);

  return Book.findNewest(limit);
};

const getRecommendedBooks = async (query) => {
  const limit = toPositiveInteger(query.limit, 10, 50);

  return Book.findRecommended(limit);
};

const saveBook = async (userId, bookId) => {
  const parsedBookId = toPositiveInteger(bookId, null);
  if (!parsedBookId) throw new AppError("Invalid book ID", 400);
  return Book.saveBook(userId, parsedBookId);
};

const unsaveBook = async (userId, bookId) => {
  const parsedBookId = toPositiveInteger(bookId, null);
  if (!parsedBookId) throw new AppError("Invalid book ID", 400);
  return Book.unsaveBook(userId, parsedBookId);
};

const getSavedBooks = async (userId) => {
  const parsedUserId = toPositiveInteger(userId, null);
  if (!parsedUserId) throw new AppError("Invalid user ID", 400);
  return Book.findSavedBooks(parsedUserId);
};

const getBookByCategory = async (categoryId, query) => {
  const parsedCategoryId = toPositiveInteger(categoryId, null);
  if (!parsedCategoryId) throw new AppError("Invalid category ID", 400);

  const page = toPositiveInteger(query.page, 1);
  const limit = toPositiveInteger(query.limit, 10, 50);

  const filters = {
    page,
    limit,
    categoryId: parsedCategoryId,
    search: toSearchText(query.search),
    name: toSearchText(query.name),
  };

  return Book.getBookBycategory(parsedCategoryId, limit);
};

module.exports = {
  listBooks,
  getBookById,
  createBook,
  getMostReviewedBooks,
  getNewestBooks,
  getRecommendedBooks,
  saveBook,
  unsaveBook,
  getSavedBooks,
  getBookByCategory,
};
