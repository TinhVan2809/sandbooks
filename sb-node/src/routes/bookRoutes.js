const express = require("express");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const requireAdmin = require("../middlewares/requireAdmin");
const { uploadBookImages, mapUploadedBookImages } = require("../middlewares/bookUpload");
const { validateListBooks, validateCreateBook } = require("../middlewares/bookValidation");

const router = express.Router();

router.get("/", validateListBooks, bookController.listBooks);
router.post(
	"/",
	authMiddleware,
	requireAdmin,
	uploadBookImages,
	mapUploadedBookImages,
	validateCreateBook,
	bookController.createBook,
);

module.exports = router;
