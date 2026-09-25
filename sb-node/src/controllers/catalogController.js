const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Author = require("../models/Author");
const Publisher = require("../models/Publisher");

const Category = require("../models/Category");

const validateName = (value) => {
  if (typeof value !== "string" || !value.trim() || value.trim().length > 255) {
    throw new AppError("Name is required and must be at most 255 characters", 422);
  }

  return value.trim();
};

const listAuthors = asyncHandler(async (_req, res) => {
  res.status(200).json({ success: true, data: { items: await Author.findMany() } });
});

const createAuthor = asyncHandler(async (req, res) => {
  try {
    const author = await Author.create(validateName(req.body?.name));
    res.status(201).json({ success: true, message: "Author created successfully", data: { author } });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new AppError("Author already exists", 409);
    }
    throw error;
  }
});

const listPublishers = asyncHandler(async (_req, res) => {
  res.status(200).json({ success: true, data: { items: await Publisher.findMany() } });
});

const createPublisher = asyncHandler(async (req, res) => {
  try {
    const publisher = await Publisher.create(validateName(req.body?.name));
    res.status(201).json({ success: true, message: "Publisher created successfully", data: { publisher } });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new AppError("Publisher already exists", 409);
    }
    throw error;
  }
});

const listCategories = asyncHandler(async (_req, res) => {
  res.status(200).json({ success: true, data: { items: await Category.findMany() } });
});

module.exports = { listAuthors, createAuthor, listPublishers, createPublisher, listCategories };