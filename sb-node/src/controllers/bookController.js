const asyncHandler = require("../utils/asyncHandler");
const bookService = require("../services/bookService");

const listBooks = asyncHandler(async (req, res) => {
  const data = await bookService.listBooks(req.query);

  res.status(200).json({
    success: true,
    data,
  });
});

const getBookById = asyncHandler(async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  if (isNaN(bookId)) {
    return res.status(400).json({ success: false, message: "Invalid book ID" });
  }

  const book = await bookService.getBookById(bookId);
  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  res.status(200).json({
    success: true,
    data: { book },
  });
});

const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBook(req.body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: {
      book,
    },
  });
});

const getMostReviewedBooks = asyncHandler(async (req, res) => {
  const items = await bookService.getMostReviewedBooks(req.query);

  res.status(200).json({
    success: true,
    data: { items },
  });
});

const getNewestBooks = asyncHandler(async (req, res) => {
  const items = await bookService.getNewestBooks(req.query);

  res.status(200).json({
    success: true,
    data: { items },
  });
});

const getRecommendedBooks = asyncHandler(async (req, res) => {
  const items = await bookService.getRecommendedBooks(req.query);

  res.status(200).json({
    success: true,
    data: { items },
  });
});

const saveBook = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id: bookId } = req.params;
  await bookService.saveBook(userId, bookId);
  res.status(200).json({ success: true, message: "Book saved successfully" });
});

const unsaveBook = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id: bookId } = req.params;
  await bookService.unsaveBook(userId, bookId);
  res.status(200).json({ success: true, message: "Book unsaved successfully" });
});

const getSavedBooks = asyncHandler(async (req, res) => {
  const items = await bookService.getSavedBooks(req.user.id);
  res.status(200).json({ success: true, data: { items } });
});

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
};
