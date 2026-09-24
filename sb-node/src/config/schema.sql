-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: emlovy-tinhlu263-f103.c.aivencloud.com    Database: sandbooks
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '67033207-b235-11f1-9728-e25f16c19f40:1-172,
cd0380f4-b10d-11f1-b029-8ee1962aa857:1-194';

--
-- Table structure for table `auth_users`
--

DROP TABLE IF EXISTS `auth_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_users`
--

LOCK TABLES `auth_users` WRITE;
/*!40000 ALTER TABLE `auth_users` DISABLE KEYS */;
INSERT INTO `auth_users` VALUES (1,'tinhvan','tinhvan','user','$2b$12$TCo3lWtwaXp3JHVKeJygoeaECwuOMY432R5AewR9uFZceUCd9V/da','2026-09-19 18:34:50','2026-09-19 18:34:50'),(2,'admin','admin','admin','$2b$12$HCFOJnXrfJ2Ny4m6oi7sPekWndCtQj9Kf5XKcNfvPiaj9amuANg3e','2026-09-19 22:04:05','2026-09-19 22:06:28');
/*!40000 ALTER TABLE `auth_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `author_id` int NOT NULL AUTO_INCREMENT,
  `author_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`author_id`),
  UNIQUE KEY `authors_author_name_unique` (`author_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Yuval Noah Harari','2026-09-19 23:10:33','2026-09-19 23:10:33'),(2,'Daniel Kahneman','2026-09-19 23:46:33','2026-09-19 23:46:33'),(3,'Patrick Rothfuss','2026-09-19 23:46:33','2026-09-19 23:46:33'),(4,'James Clear','2026-09-20 04:26:04','2026-09-20 04:26:04'),(5,'Peter Thiel','2026-09-20 04:27:30','2026-09-20 04:27:30'),(6,'Jim Collins','2026-09-20 04:28:42','2026-09-20 04:28:42');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_categories`
--

DROP TABLE IF EXISTS `book_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_categories` (
  `book_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`category_id`),
  KEY `fk_bc_category` (`category_id`),
  CONSTRAINT `fk_bc_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bc_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_categories`
--

LOCK TABLES `book_categories` WRITE;
/*!40000 ALTER TABLE `book_categories` DISABLE KEYS */;
INSERT INTO `book_categories` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `book_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_img`
--

DROP TABLE IF EXISTS `book_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_img` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `is_thumbnail` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`img_id`),
  KEY `book_img_thumbnail_index` (`book_id`,`is_thumbnail`),
  CONSTRAINT `book_img_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_img`
--

LOCK TABLES `book_img` WRITE;
/*!40000 ALTER TABLE `book_img` DISABLE KEYS */;
INSERT INTO `book_img` VALUES (1,1,'https://i3mtaizmczsuowek.public.blob.vercel-storage.com/books/a252125f-61a4-4518-88f5-8d6cf58c5e69.webp',1,'2026-09-19 23:44:06'),(2,2,'https://i3mtaizmczsuowek.public.blob.vercel-storage.com/books/3a29b0d4-2563-43fe-b714-8dd8b62c3a97.webp',1,'2026-09-19 23:50:03'),(3,3,'https://i3mtaizmczsuowek.public.blob.vercel-storage.com/books/bc2a1b84-3fde-418e-9121-95d5ad1a9bda.jpg',1,'2026-09-19 23:51:05'),(4,4,'https://i3mtaizmczsuowek.public.blob.vercel-storage.com/books/42bffcfd-dde8-4784-b814-542a9ae1108b.jpg',1,'2026-09-20 04:26:44'),(5,5,'https://i3mtaizmczsuowek.public.blob.vercel-storage.com/books/b6bb99f3-590b-4c19-8b83-d27f2c9cb2a3.jpg',1,'2026-09-20 04:28:04'),(6,6,'https://i3mtaizmczsuowek.public.blob.vercel-storage.com/books/4553c377-e4bc-40a2-b038-aedf88cecbda.jpg',1,'2026-09-20 04:29:19'),(7,8,'https://i3mtaizmczsuowek.public.blob.vercel-storage.com/books/ecd40431-396c-4bf5-a955-8f66964ed8ab.jpg',1,'2026-09-21 05:09:25');
/*!40000 ALTER TABLE `book_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_reviews`
--

DROP TABLE IF EXISTS `book_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `book_reviews_book_user_unique` (`book_id`,`user_id`),
  KEY `book_reviews_user_index` (`user_id`),
  CONSTRAINT `book_reviews_book_fk` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  CONSTRAINT `book_reviews_user_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `book_reviews_rating_check` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_reviews`
--

LOCK TABLES `book_reviews` WRITE;
/*!40000 ALTER TABLE `book_reviews` DISABLE KEYS */;
INSERT INTO `book_reviews` VALUES (1,1,1,5,'Sách hay nha','2026-09-20 04:19:42','2026-09-20 04:19:42'),(2,1,2,5,'Sách hay nha','2026-09-20 04:22:28','2026-09-20 04:22:28'),(3,2,2,5,'Sách mới','2026-09-20 04:22:48','2026-09-20 04:22:48'),(5,4,2,4,'Sách hay nha','2026-09-20 04:31:15','2026-09-20 04:31:15'),(6,5,1,4,'Sách hay nha','2026-09-20 04:31:25','2026-09-20 04:31:25'),(7,6,1,4,'Sách hay nha','2026-09-20 04:36:55','2026-09-20 04:36:55');
/*!40000 ALTER TABLE `book_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_save`
--

DROP TABLE IF EXISTS `book_save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_save` (
  `user_id` bigint unsigned NOT NULL,
  `book_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`book_id`),
  KEY `fk_book_save_book` (`book_id`),
  CONSTRAINT `fk_book_save_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_book_save_user` FOREIGN KEY (`user_id`) REFERENCES `auth_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_save`
--

LOCK TABLES `book_save` WRITE;
/*!40000 ALTER TABLE `book_save` DISABLE KEYS */;
INSERT INTO `book_save` VALUES (1,2,'2026-09-21 00:18:38'),(1,4,'2026-09-22 06:47:03');
/*!40000 ALTER TABLE `book_save` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `ISBN` varchar(50) NOT NULL,
  `author_id` int DEFAULT NULL,
  `publisher_id` int DEFAULT NULL,
  `publisher_year` date DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('available','unavailable') DEFAULT 'available',
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `books_isbn_unique` (`ISBN`),
  KEY `fk_author` (`author_id`),
  KEY `fk_publisher` (`publisher_id`),
  KEY `books_title_index` (`title`),
  KEY `books_language_index` (`language`),
  CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`),
  CONSTRAINT `fk_publisher` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`publisher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Sapiens: A Brief History of Humankind','978-0099590088',1,1,'2011-01-01','Tiếng Việt','A groundbreaking narrative of humanity\'s creation and evolution, from the Stone Age through the 21st century, exploring how biology and history shaped what it means to be human.','2026-09-19 23:44:06','2026-09-19 23:44:06','available'),(2,'The Name of the Wind','978-0099590099',3,3,'2011-01-01','Tiếng Việt','A landmark work in psychology that explores the two systems driving how we think: the fast, intuitive system and the slower, deliberate, rational one.','2026-09-19 23:50:03','2026-09-19 23:50:03','available'),(3,'Thinking, Fast and Slow','978-0099590011',3,4,'2011-01-01','Tiếng Việt','A landmark work in psychology that explores the two systems driving how we think: the fast, intuitive system and the slower, deliberate, rational one.','2026-09-19 23:51:05','2026-09-19 23:51:05','available'),(4,'James Clear','978-0099590022',4,2,'2012-01-01','Tiếng Việt','A revolutionary framework for building good habits and breaking bad ones, showing how 1% improvements compound into remarkable long-term results.','2026-09-20 04:26:44','2026-09-20 04:26:44','available'),(5,'Zero to One','978-0099590033',5,4,'2015-01-01','Tiếng Việt','Notes on startups and how to build the future. Every moment in business happens only once; progress comes from doing new things, not copying what already exists.','2026-09-20 04:28:04','2026-09-20 04:28:04','available'),(6,'Good to Great','978-0099590044',6,4,'2013-01-01','Tiếng Việt','Based on five years of rigorous research, Collins examines why some companies make the leap to sustained greatness while comparable companies fail to do so.','2026-09-20 04:29:19','2026-09-20 04:29:19','available'),(8,'Những đòn tâm lý trong nghệ thuật thuyết phục','978-0099590092',3,1,'2019-01-01','Tiếng Việt','Sách Những đòn tâm lý trong nghệ thuật thuyết phục chỉ ra 7 nguyên tắc trong nghệ thuật thuyết phục','2026-09-21 05:09:24','2026-09-21 05:09:24','available');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Văn học','Tieu thuyet, truyen ngan, tho ca trong va ngoai nuoc','2026-09-20 03:53:12','2026-09-20 03:53:12'),(2,'Khoa học','Sach khoa hoc tu nhien, khoa hoc ung dung','2026-09-20 03:53:12','2026-09-20 03:53:12'),(3,'Công nghệ','Lap trinh, tri tue nhan tao, phan cung','2026-09-20 03:53:12','2026-09-20 03:53:12'),(4,'Kinh tế','Tai chinh, kinh doanh, quan tri','2026-09-20 03:53:12','2026-09-20 03:53:12'),(5,'Lịch sử','Lich su Viet Nam va the gioi','2026-09-20 03:53:12','2026-09-20 03:53:12'),(6,'Kỹ năng sống','Phat trien ban than, ky nang mem','2026-09-20 03:53:12','2026-09-20 03:53:12'),(7,'Thiếu nhi','Sach danh cho tre em va thieu nien','2026-09-20 03:53:12','2026-09-20 03:53:12'),(8,'Triết học','Triet hoc Dong - Tay, tu tuong hoc','2026-09-20 03:53:12','2026-09-20 03:53:12'),(9,'Tâm lý học','Tam ly hoc ung dung, hanh vi con nguoi','2026-09-20 03:53:12','2026-09-20 03:53:12');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `publisher_id` int NOT NULL AUTO_INCREMENT,
  `publisher_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`publisher_id`),
  UNIQUE KEY `publisher_publisher_name_unique` (`publisher_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1,'Nhà xuất bản Tri Thức','2026-09-19 23:11:53','2026-09-19 23:11:53'),(2,'Nhà xuất bản Hà Nội','2026-09-19 23:12:32','2026-09-19 23:12:32'),(3,'DAW Books','2026-09-19 23:47:28','2026-09-19 23:47:28'),(4,'Farrar, Straus and Giroux','2026-09-19 23:47:28','2026-09-19 23:47:28');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `token_hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `revoked_at` datetime DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `refresh_tokens_token_hash_unique` (`token_hash`),
  KEY `refresh_tokens_user_id_index` (`user_id`),
  KEY `refresh_tokens_expires_at_index` (`expires_at`),
  CONSTRAINT `refresh_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `auth_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (1,1,'6222f51f0eca27a82792f3ccf22ff1af178b58a94eb3958cdf00f1ac0262b8a5','2026-09-27 01:48:58',NULL,'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36','::1','2026-09-19 18:48:57'),(2,2,'6bdd8505d93a68815f004942ab829d4fa8fd1c3ddc4d4ce4fd766857c95c3c91','2026-09-27 05:04:18',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-19 22:04:18'),(3,2,'9d28cac588ed1491b37a55863fc014f975a385ab1c2a0e9524ab3827cce5d238','2026-09-27 05:06:46',NULL,'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36','::1','2026-09-19 22:06:46'),(4,2,'81d1669166604e8a62b52967681abe3ee13c08fce24d1b632d1468b6b8717c34','2026-09-27 05:51:57',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-19 22:51:57'),(5,2,'eb878413ddf7c349bf7b05031438cef0980c92d73f591efc3b7238e98f7a7a05','2026-09-27 06:07:29',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-19 23:07:29'),(6,2,'c669f2987c8063cb0dd591475cc3a1bb935d9df366f1c229dd778fbd1d1069d4','2026-09-27 06:38:51','2026-09-19 23:58:45','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-19 23:38:52'),(7,1,'fd3300f99da640b2a9a6fa3392918423f308adc42104b45be2317eabb7a3ca3b','2026-09-27 06:59:01',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-19 23:59:01'),(8,2,'a17a321e4ede62f55d7f2376b1cc835a419ab4f8685fb72575053d8cd2642505','2026-09-27 11:25:12','2026-09-20 04:29:28','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36','::1','2026-09-20 04:25:13'),(9,1,'d2add7367fa22582d639f8146866535f694a77bef9f417653f1b3abef7bfc699','2026-09-27 11:29:40','2026-09-20 23:58:39','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-20 04:29:41'),(10,1,'25f79a6905dd120d81cb5d4bf113e2f6cf2354a532125830d4cd6066e62f102c','2026-09-28 06:58:38',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-20 23:58:39'),(11,1,'cde05c60c195767d95f27d6ab8c6acb28892e17438e2f8e960987db70c9fcd3b','2026-09-28 06:58:38','2026-09-21 00:02:08','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-20 23:58:39'),(12,1,'f1fe886b9be91166b771bdce9d0d117e7d97796cb48fcc77d106b5d48097cf9e','2026-09-28 07:02:25','2026-09-21 00:02:44','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 00:02:26'),(13,1,'6c412b93130c2ffe79fe9529c69fe0ea3b944eb9f8dc235f2b668dbeb9481628','2026-09-28 07:04:20','2026-09-21 00:04:26','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 00:04:22'),(14,1,'38f8251f11968c3c0c911596196d2ae57a053f3dd41dbb70eee4140007733b70','2026-09-28 07:05:39','2026-09-21 00:06:00','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 00:05:41'),(15,1,'4f117816cb62520a0b69dc55cb3b267cbe02cb4f9671e0e9a14185d47f2251f8','2026-09-28 07:07:06','2026-09-21 00:20:36','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 00:07:07'),(16,2,'0b212bcca8f882d137588efdb33fc4ae946f860de119dcb9db25d911309b1f16','2026-09-28 07:21:28','2026-09-21 00:22:18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 00:21:29'),(17,1,'c640b5cb26604614de1d39b2c2a4006f584be90d38062cc4f8a974b277eb03c9','2026-09-28 01:00:01',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 01:00:01'),(18,1,'7cd6d191967675fb9d9c283b52dc98ad37b181ccc2d53da4c0e6a6cfc4b9c013','2026-09-28 01:00:06',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 01:00:05'),(19,1,'6a86127f65ae269e08a6202ca3c38bd9a351a078862590e5ac65bf173c9fe236','2026-09-28 01:00:15',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 01:00:14'),(20,1,'6153a07c02c8f3be730e20a17863bb4a8a4dc2e3859b821efa54b1a1b4d96bd7','2026-09-28 01:06:49','2026-09-21 01:13:06','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 01:06:49'),(21,2,'b8e1374321606b463c02a11ea5f122acec72df2f4eebba9dbebcf53e23ef2a5e','2026-09-28 01:13:21','2026-09-21 01:32:22','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 01:13:20'),(22,1,'1469a64fbb14d5d731096bb5199307b65bb1fd8908322b1925b5cb2a8d77d328','2026-09-28 01:49:04','2026-09-21 02:38:22','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 01:49:04'),(23,1,'1d73496e8efc157f1331c9a10df6c2fb041bbd18d13afddf969f62836dce36c1','2026-09-28 02:38:23',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 02:38:22'),(24,1,'b1d8497f472384523b5e7db8ee439198a9ab7942986608eb98664b6369e813d8','2026-09-28 02:38:23','2026-09-21 02:43:37','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 02:38:23'),(25,1,'dafc5beae5ee0dd68ab115ad53207bea60e6b55a484afc36eb1515e58ccc98fe','2026-09-28 02:44:32','2026-09-21 04:31:36','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 02:44:32'),(26,1,'ec85545af0430ca4a3fd36ca12b206d20de613c72814057c77b9300b9b117e5c','2026-09-28 04:31:37','2026-09-21 05:04:15','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 04:31:37'),(27,1,'6da91ca4ee9bd713cf05a9041c2695aa703bbc524450f95096c8440bdb916eb1','2026-09-28 05:04:15',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 05:04:15'),(28,1,'07828670cbdfeb3c4d6c5f80af45c80a7664b3b34b84d4acf852ede73560cf0a','2026-09-28 05:04:16','2026-09-21 05:07:23','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 05:04:16'),(29,2,'74f1ec87273348d419bd5a07b87b00a1e8dd4cc2dfe865aebe9925f347f4c3cb','2026-09-28 05:07:32','2026-09-21 05:09:31','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 05:07:32'),(30,1,'82da70c9f8734d82e1393f8a9d5809b42f14181b9babadc4260d6b93c184c8e1','2026-09-28 05:09:45','2026-09-21 06:17:31','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 05:09:45'),(31,1,'2a1e2b8f6e4674383555308359c4632ace5537664f1512cc93732f4e34f4a136','2026-09-28 12:16:52','2026-09-21 05:36:40','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 05:16:53'),(32,1,'8b21acb0eac4dc00ae3f62d9c494736bf9d994f13052911447414bd0fe9abb98','2026-09-28 12:36:40',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 05:36:41'),(33,1,'6f8e2a5e03bdfd241c5eee0ddeac2bcf36c7e1b1aeeacc6c75a7165536ceae13','2026-09-28 12:36:40','2026-09-21 05:54:04','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 05:36:41'),(34,1,'a58cd9329cd40e06b05601754b85152da40e13f200eb9412266714a4823a61db','2026-09-28 12:54:04',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 05:54:05'),(35,1,'519024e3c22b9334328e56dc7ac19c6908f1d4dd2ad72f46d73898135c7a8126','2026-09-28 12:54:04','2026-09-22 05:36:20','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-21 05:54:05'),(36,1,'3df630e83d1d2d6915ecf9ce0078e1616bf31f652d9eeedbe16cfaf4f59b75af','2026-09-28 06:17:32','2026-09-21 06:21:57','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-21 06:17:32'),(37,1,'b8edd3cd67d54abba37afbbd4e109885661cde712bc9758a724cf95428a6224a','2026-09-29 12:36:18',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 05:36:20'),(38,1,'ac7e3b2348ec4a2e4bc09ce92da2bab2a338805e5a588d3c0bbf91a566cb02a7','2026-09-29 12:36:18','2026-09-22 05:53:46','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 05:36:20'),(39,1,'5b6eeb5b14bd6157f093ef96efde571c939e4a3a98fcc15faa9bf399b5e2e3a8','2026-09-29 12:53:44','2026-09-22 06:08:53','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 05:53:47'),(40,1,'828f88088f5bd75312abcb5d3b4eeca260e1cfbbc2827b0109f696ce12f224b8','2026-09-29 13:08:51','2026-09-22 06:39:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 06:08:53'),(41,1,'e270e91f36b80ed88b615a06b537cbb2346e133d6f62ec6c02af25b9be3ba42c','2026-09-29 13:08:51',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 06:08:53'),(42,1,'f90d0ac9e032e0660279c160105eb80e5e1f47857c03a30ab5fc52d80c806d10','2026-09-29 06:18:34','2026-09-22 07:29:42','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-22 06:18:34'),(43,1,'626142ae0f7b8445c95ce35bed79fa3572d03d788186932c3ada411a8a5e3b02','2026-09-29 13:39:14',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 06:39:16'),(44,1,'ab9e4d7d95d83ca93452aadf8e09af029c14a8aeece508e59b1ed500a245a33e','2026-09-29 13:39:14','2026-09-22 06:55:45','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 06:39:16'),(45,1,'90627bc7fbfb0a2113b17a965b0d8628475886a30aa32f710c4ba3b3b51d7e66','2026-09-29 13:55:43',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 06:55:45'),(46,1,'792a8288b3bcb486b5f3afc55592fcb28fe2ed0805c223c2ec13094c955bbccc','2026-09-29 13:55:43','2026-09-22 06:55:56','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 06:55:45'),(47,1,'07dd056c33ee6ee59c41a6db09c9b790383f5001d9b2271a97ed7f1ecc2886ab','2026-09-29 13:56:03','2026-09-22 07:16:34','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 06:56:05'),(48,1,'e7edcc34b8c4373c229cc3df51e4dd9bf96fd027767ece64eb49bc94ebd36239','2026-09-29 14:16:32',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 07:16:34'),(49,1,'6ae7f11b21ee25005e8be6b42cedcfd140368ad051fb58b5c6b5c0f8b3e6ed0b','2026-09-29 14:16:32',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 07:16:35'),(50,1,'c37d6cb5b7573e03ebfb444bac8bfbe08f55c600fa528ad60e116425166ccf7d','2026-09-29 07:29:42',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-22 07:29:42'),(51,1,'9bd3d7f78839face3703e74b724e1b3c05b731f1c66a2e50d4fa50044c850b85','2026-09-29 07:30:27','2026-09-22 20:08:11','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-22 07:30:28'),(52,1,'5d92ecd0d7a0daae87be3d89b21bf0f584db37067e3e51bb4451e46b4879d2df','2026-09-29 07:36:02','2026-09-22 07:38:26','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','116.108.176.140','2026-09-22 07:36:02'),(53,2,'79ede714d34449d7b332504db4803edf04220fc2981a7f582c6fc594951e955d','2026-09-29 07:38:54','2026-09-22 07:39:22','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','116.108.176.140','2026-09-22 07:38:54'),(54,1,'890b20c0e8ecbf058baed29d57565b031132b9c02da5a4395c4a233144c6067b','2026-09-29 20:08:12',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','116.108.176.140','2026-09-22 20:08:12'),(55,1,'44624c09c15e0229f6d9b9d45f191d7c534a64bdce05a7ef876ad2b8200d75a9','2026-09-30 05:25:22',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-22 22:25:24');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-24 10:46:26
