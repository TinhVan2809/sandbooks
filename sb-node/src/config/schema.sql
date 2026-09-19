CREATE TABLE IF NOT EXISTS auth_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY auth_users_username_unique (username),
  KEY auth_users_role_index (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS authors (
  author_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  author_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (author_id),
  UNIQUE KEY authors_author_name_unique (author_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS publisher (
  publisher_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  publisher_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (publisher_id),
  UNIQUE KEY publisher_publisher_name_unique (publisher_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS books (
  book_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  ISBN VARCHAR(50) NOT NULL,
  author_id INT UNSIGNED NULL,
  publisher_id INT UNSIGNED NULL,
  publisher_year YEAR NULL,
  language VARCHAR(100) NULL,
  description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (book_id),
  UNIQUE KEY books_isbn_unique (ISBN),
  KEY books_title_index (title),
  KEY books_language_index (language),
  KEY books_author_id_index (author_id),
  KEY books_publisher_id_index (publisher_id),
  CONSTRAINT books_author_id_foreign
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  CONSTRAINT books_publisher_id_foreign
    FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS book_img (
  img_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  book_id INT UNSIGNED NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  is_thumbnail TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (img_id),
  KEY book_img_book_id_index (book_id),
  KEY book_img_thumbnail_index (book_id, is_thumbnail),
  CONSTRAINT book_img_book_id_foreign
    FOREIGN KEY (book_id) REFERENCES books(book_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  revoked_at DATETIME NULL,
  user_agent VARCHAR(255) NULL,
  ip_address VARCHAR(45) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY refresh_tokens_token_hash_unique (token_hash),
  KEY refresh_tokens_user_id_index (user_id),
  KEY refresh_tokens_expires_at_index (expires_at),
  CONSTRAINT refresh_tokens_user_id_foreign
    FOREIGN KEY (user_id) REFERENCES auth_users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
