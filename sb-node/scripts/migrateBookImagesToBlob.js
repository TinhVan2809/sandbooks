const fs = require("fs/promises");
const path = require("path");
const dotenv = require("dotenv");
const { put } = require("@vercel/blob");

dotenv.config({ path: path.resolve(__dirname, "..", ".env"), quiet: true });

const db = require("../src/config/database");

const uploadsDirectory = path.resolve(__dirname, "../uploads/books");
const isApplyMode = process.argv.includes("--apply");
const shouldDeleteLocalFiles = process.argv.includes("--delete-local");

const mimeTypes = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

const getBlobPath = (imageUrl) => {
  if (!imageUrl || !imageUrl.startsWith("/uploads/books/")) {
    return null;
  }

  const fileName = path.basename(imageUrl);

  if (fileName !== imageUrl.slice("/uploads/books/".length)) {
    throw new Error(`Unsafe image path: ${imageUrl}`);
  }

  return path.join(uploadsDirectory, fileName);
};

const migrate = async () => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required");
  }

  const rows = await db.query(
    `SELECT img_id, image_url
     FROM book_img
     WHERE image_url LIKE '/uploads/books/%'
     ORDER BY img_id ASC`,
  );

  console.log(`Found ${rows.length} local book image(s).`);

  for (const row of rows) {
    const localPath = getBlobPath(row.image_url);

    try {
      await fs.access(localPath);
    } catch (_error) {
      console.warn(`[missing] #${row.img_id}: ${localPath}`);
      continue;
    }

    if (!isApplyMode) {
      console.log(`[dry-run] #${row.img_id}: ${localPath}`);
      continue;
    }

    const extension = path.extname(localPath).toLowerCase();
    const fileBuffer = await fs.readFile(localPath);
    let blob;

    try {
      blob = await put(`books/${path.basename(localPath)}`, fileBuffer, {
        access: "public",
        contentType: mimeTypes[extension] || "application/octet-stream",
        addRandomSuffix: false,
      });
    } catch (uploadError) {
      if (uploadError.message?.includes("private store")) {
        throw new Error(
          "The BLOB_READ_WRITE_TOKEN belongs to a private store. Create/use a public Blob Store for book images, then replace the token.",
        );
      }

      throw uploadError;
    }

    await db.execute(
      "UPDATE book_img SET image_url = ? WHERE img_id = ?",
      [blob.url, row.img_id],
    );

    console.log(`[migrated] #${row.img_id}: ${blob.url}`);

    if (shouldDeleteLocalFiles) {
      await fs.unlink(localPath);
    }
  }
};

migrate()
  .catch((error) => {
    console.error("Image migration failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => db.closeDatabaseConnection());