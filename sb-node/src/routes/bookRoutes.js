const express = require("express");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const requireAdmin = require("../middlewares/requireAdmin");
const { validateListBooks, validateCreateBook } = require("../middlewares/bookValidation");

const router = express.Router();

router.get("/", validateListBooks, bookController.listBooks);
router.post("/", authMiddleware, requireAdmin, validateCreateBook, bookController.createBook);

module.exports = router;
