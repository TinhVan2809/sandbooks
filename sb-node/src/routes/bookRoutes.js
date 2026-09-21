const express = require("express");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const requireAdmin = require("../middlewares/requireAdmin");
const { uploadBookImages } = require("../middlewares/bookUpload");
const { validateListBooks, validateCreateBook } = require("../middlewares/bookValidation");

const router = express.Router();

router.get("/", validateListBooks, bookController.listBooks);
router.get("/most-reviewed", bookController.getMostReviewedBooks);
router.get("/newest", bookController.getNewestBooks);
router.get("/recommended", bookController.getRecommendedBooks);
router.get("/saved/:id", authMiddleware, bookController.getSavedBooks);
router.get("/:id", bookController.getBookById);
router.post("/:id/save", authMiddleware, bookController.saveBook);
router.delete("/:id/save", authMiddleware, bookController.unsaveBook);

router.post(
	"/",
	authMiddleware,
	requireAdmin,
	uploadBookImages,
	validateCreateBook,
	bookController.createBook,
);

module.exports = router;
