const AppError = require("../utils/AppError");

const urlRegex = /^https?:\/\/[^\s]+$/i;
const uploadedImagePathRegex = /^\/uploads\/books\/[a-z0-9-]+\.(jpg|jpeg|png|webp|gif)$/i;

const failValidation = (errors) => {
  throw new AppError("Validation failed", 422, errors);
};

const isPositiveInteger = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

const validateListBooks = (req, _res, next) => {
  try {
    const errors = [];
    const { page, limit, authorId, publisherId } = req.query;

    if (page !== undefined && !isPositiveInteger(page)) {
      errors.push({ field: "page", message: "Page must be a positive integer" });
    }

    if (limit !== undefined && (!isPositiveInteger(limit) || Number(limit) > 50)) {
      errors.push({ field: "limit", message: "Limit must be a positive integer and at most 50" });
    }

    if (authorId !== undefined && !isPositiveInteger(authorId)) {
      errors.push({ field: "authorId", message: "Author id must be a positive integer" });
    }

    if (publisherId !== undefined && !isPositiveInteger(publisherId)) {
      errors.push({ field: "publisherId", message: "Publisher id must be a positive integer" });
    }

    if (errors.length) {
      failValidation(errors);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateCreateBook = (req, _res, next) => {
  try {
    const errors = [];
    const {
      title,
      isbn,
      authorId,
      authorName,
      publisherId,
      publisherName,
      publisherYear,
      language,
      images,
    } = req.body || {};

    if (!title || typeof title !== "string" || !title.trim() || title.trim().length > 255) {
      errors.push({ field: "title", message: "Title is required and must be at most 255 characters" });
    }

    if (!isbn || typeof isbn !== "string" || !isbn.trim() || isbn.trim().length > 50) {
      errors.push({ field: "isbn", message: "ISBN is required and must be at most 50 characters" });
    }

    if (authorId !== undefined && !isPositiveInteger(authorId)) {
      errors.push({ field: "authorId", message: "Author id must be a positive integer" });
    }

    if (!authorId && (!authorName || typeof authorName !== "string" || !authorName.trim())) {
      errors.push({ field: "authorName", message: "Author name is required when authorId is not provided" });
    }

    if (publisherId !== undefined && !isPositiveInteger(publisherId)) {
      errors.push({ field: "publisherId", message: "Publisher id must be a positive integer" });
    }

    if (!publisherId && publisherName !== undefined && (typeof publisherName !== "string" || !publisherName.trim())) {
      errors.push({ field: "publisherName", message: "Publisher name must be a non-empty string" });
    }

    if (publisherYear !== undefined && publisherYear !== null) {
      const year = Number(publisherYear);

      if (!Number.isInteger(year) || year < 1000 || year > 9999) {
        errors.push({ field: "publisherYear", message: "Publisher year must be a 4-digit year" });
      }
    }

    if (language !== undefined && language !== null && (typeof language !== "string" || language.length > 100)) {
      errors.push({ field: "language", message: "Language must be at most 100 characters" });
    }

    if (images !== undefined) {
      if (!Array.isArray(images)) {
        errors.push({ field: "images", message: "Images must be an array" });
      } else {
        images.forEach((image, index) => {
          if (
            !image
            || typeof image.url !== "string"
            || (!urlRegex.test(image.url.trim()) && !uploadedImagePathRegex.test(image.url.trim()))
          ) {
            errors.push({
              field: `images[${index}].url`,
              message: "Image url must be a valid http(s) URL or uploaded image path",
            });
          }
        });
      }
    }

    if (errors.length) {
      failValidation(errors);
    }

    req.body.authorId = authorId ? Number(authorId) : null;
    req.body.publisherId = publisherId ? Number(publisherId) : null;
    req.body.publisherYear = publisherYear ? Number(publisherYear) : null;
    if (Array.isArray(images)) {
      const explicitThumbnailIndex = images.findIndex((image) => image.isThumbnail === true);
      const thumbnailIndex = explicitThumbnailIndex >= 0 ? explicitThumbnailIndex : 0;

      req.body.images = images.map((image, index) => ({
        url: image.url.trim(),
        isThumbnail: index === thumbnailIndex,
      }));
    } else {
      req.body.images = [];
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateListBooks,
  validateCreateBook,
};
