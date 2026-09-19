const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const config = require("../config/env");
const AppError = require("../utils/AppError");

const uploadDirectory = path.resolve(__dirname, "../../uploads/books");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDirectory),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

const fileFilter = (_req, file, callback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(new AppError("Only image files are allowed", 422));
  }

  callback(null, true);
};

const uploadBookImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.upload.postMediaMaxFileSize,
    files: config.upload.postMediaMaxFiles,
  },
}).array("images", config.upload.postMediaMaxFiles);

const mapUploadedBookImages = (req, _res, next) => {
  req.body.images = (req.files || []).map((file, index) => ({
    url: `/uploads/books/${file.filename}`,
    isThumbnail: index === 0,
  }));

  next();
};

module.exports = {
  uploadBookImages,
  mapUploadedBookImages,
};