CREATE TABLE IF NOT EXISTS `book_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `book_reviews_book_user_unique` (`book_id`, `user_id`),
  KEY `book_reviews_user_index` (`user_id`),
  CONSTRAINT `book_reviews_book_fk` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  CONSTRAINT `book_reviews_user_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `book_reviews_rating_check` CHECK (`rating` BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;