const asyncHandler = require("../utils/asyncHandler");
const bookService = require("../services/bookService");

const listBooks = asyncHandler(async (req, res) => {
  const data = await bookService.listBooks(req.query);

  res.status(200).json({
    success: true,
    data,
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
  // Get from req.params to allow fetching any user's saved books (if authorized, but for now we'll just fetch based on params)
  const { id: userId } = req.params;
  const items = await bookService.getSavedBooks(userId);
  res.status(200).json({ success: true, data: { items } });
});

module.exports = {
  listBooks,
  createBook,
  getMostReviewedBooks,
  getNewestBooks,
  getRecommendedBooks,
  saveBook,
  unsaveBook,
  getSavedBooks,
};
