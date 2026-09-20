const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const requireAdmin = require("../middlewares/requireAdmin");
const catalogController = require("../controllers/catalogController");

const router = express.Router();

router.get("/authors", catalogController.listAuthors);
router.post("/authors", authMiddleware, requireAdmin, catalogController.createAuthor);
router.get("/publishers", catalogController.listPublishers);
router.post("/publishers", authMiddleware, requireAdmin, catalogController.createPublisher);
router.get("/categories", catalogController.listCategories);

module.exports = router;