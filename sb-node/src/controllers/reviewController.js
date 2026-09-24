const asyncHandler = require("../utils/asyncHandler");
const reviewService = require("../services/reviewService");

const getReviews = asyncHandler(async (req, res) => {
  const bookId =
    req.params.id ||
    req.params.bookId ||
    req.query.bookId ||
    req.query.book_id;

  const data = await reviewService.getReviews({
    bookId,
    limit: req.query.limit,
    page: req.query.page,
  });

  res.status(200).json({
    success: true,
    data,
  });
});

const getReviewById = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId || req.params.id;
  const review = await reviewService.getReviewById(reviewId);

  res.status(200).json({
    success: true,
    data: { review },
  });
});

const createReview = asyncHandler(async (req, res) => {
  const bookId =
    req.params.id ||
    req.params.bookId ||
    req.body.bookId ||
    req.body.book_id;

  const { rating, comment } = req.body;
  const userId = req.user.id;

  const review = await reviewService.createReview({
    userId,
    bookId,
    rating,
    comment,
  });

  res.status(201).json({
    success: true,
    message: "Tạo bình luận thành công",
    data: { review },
  });
});

const deleteReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId || req.params.id;
  const userId = req.user.id;

  await reviewService.deleteReview({
    reviewId,
    userId,
  });

  res.status(200).json({
    success: true,
    message: "Xóa bình luận thành công",
  });
});

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  deleteReview,
};
