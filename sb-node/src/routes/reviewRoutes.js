const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router({ mergeParams: true });

router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/", authMiddleware, reviewController.createReview);
router.delete("/:id", authMiddleware, reviewController.deleteReview);

module.exports = router;
