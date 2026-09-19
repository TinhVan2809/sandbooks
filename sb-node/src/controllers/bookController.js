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

module.exports = {
  listBooks,
  createBook,
};
