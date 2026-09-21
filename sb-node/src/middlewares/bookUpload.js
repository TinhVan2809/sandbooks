const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { put } = require("@vercel/blob");
const config = require("../config/env");
const AppError = require("../utils/AppError");

const uploadDirectory = path.resolve(__dirname, "../../uploads/books");
const useBlobStorage = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
fs.mkdirSync(uploadDirectory, { recursive: true });

const diskStorage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDirectory),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

const storage = useBlobStorage ? multer.memoryStorage() : diskStorage;

const fileFilter = (_req, file, callback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(new AppError("Only image files are allowed", 422));
  }

  callback(null, true);
};

const parseBookImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.upload.postMediaMaxFileSize,
    files: config.upload.postMediaMaxFiles,
  },
}).array("images", config.upload.postMediaMaxFiles);

const uploadBookImages = (req, res, next) => {
  parseBookImages(req, res, async (error) => {
    if (error) {
      return next(error);
    }

    try {
      req.body.images = await Promise.all((req.files || []).map(async (file, index) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const url = useBlobStorage
          ? (await put(`books/${crypto.randomUUID()}${extension}`, file.buffer, {
              access: "public",
              contentType: file.mimetype,
            })).url
          : `/uploads/books/${file.filename}`;

        return { url, isThumbnail: index === 0 };
      }));

      next();
    } catch (uploadError) {
      next(uploadError);
    }
  });
};

module.exports = {
  uploadBookImages,
};