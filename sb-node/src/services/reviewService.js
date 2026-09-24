const AppError = require("../utils/AppError");
const Review = require("../models/Review");
const Book = require("../models/Book");

const toPositiveInteger = (value, fallback = null, max = null) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }
  return max ? Math.min(parsed, max) : parsed;
};

const getReviews = async (query = {}) => {
  const bookId = query.bookId ? toPositiveInteger(query.bookId, null) : null;
  const limit = toPositiveInteger(query.limit, 50, 100);
  const page = toPositiveInteger(query.page, 1);
  const offset = (page - 1) * limit;

  const items = await Review.findMany({ bookId, limit, offset });

  return {
    items,
    pagination: {
      page,
      limit,
    },
  };
};

const getReviewById = async (reviewId) => {
  const parsedId = toPositiveInteger(reviewId, null);
  if (!parsedId) {
    throw new AppError("Invalid review ID", 400);
  }

  const review = await Review.findById(parsedId);
  if (!review) {
    throw new AppError("Bình luận không tồn tại", 404);
  }

  return review;
};

const createReview = async ({ userId, bookId, rating = 5, comment }) => {
  const parsedBookId = toPositiveInteger(bookId, null);
  if (!parsedBookId) {
    throw new AppError("Mã sách không hợp lệ", 400);
  }

  const book = await Book.findById(parsedBookId);
  if (!book) {
    throw new AppError("Không tìm thấy sách", 404);
  }

  if (typeof comment !== "string" || !comment.trim()) {
    throw new AppError("Nội dung bình luận không được để trống", 422);
  }

  const parsedRating = Number.parseInt(rating, 10);
  if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    throw new AppError("Đánh giá phải từ 1 đến 5 sao", 422);
  }

  try {
    return await Review.create({
      bookId: parsedBookId,
      userId,
      rating: parsedRating,
      comment: comment.trim(),
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new AppError("Bạn đã đánh giá cuốn sách này rồi", 409);
    }
    throw error;
  }
};

const deleteReview = async ({ reviewId, userId }) => {
  const parsedReviewId = toPositiveInteger(reviewId, null);
  if (!parsedReviewId) {
    throw new AppError("Mã bình luận không hợp lệ", 400);
  }

  const review = await Review.findById(parsedReviewId);
  if (!review) {
    throw new AppError("Không tìm thấy bình luận", 404);
  }

  if (String(review.userId) !== String(userId)) {
    throw new AppError("Bạn chỉ có thể xóa bình luận của chính mình", 403);
  }

  await Review.deleteById(parsedReviewId);

  return true;
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  deleteReview,
};
