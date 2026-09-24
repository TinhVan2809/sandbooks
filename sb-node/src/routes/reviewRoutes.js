const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router({ mergeParams: true });

router.get("/", reviewController.getReviews);
router.get("/:bookId", reviewController.getReviews);
router.post("/:bookId", authMiddleware, reviewController.createReview);
router.delete("/:reviewId", authMiddleware, reviewController.deleteReview);

module.exports = router;
