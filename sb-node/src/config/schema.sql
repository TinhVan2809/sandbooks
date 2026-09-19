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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '67033207-b235-11f1-9728-e25f16c19f40:1-43,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_img`
--

LOCK TABLES `book_img` WRITE;
/*!40000 ALTER TABLE `book_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_img` ENABLE KEYS */;
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
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `books_isbn_unique` (`ISBN`),
  KEY `fk_author` (`author_id`),
  KEY `fk_publisher` (`publisher_id`),
  KEY `books_title_index` (`title`),
  KEY `books_language_index` (`language`),
  CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`),
  CONSTRAINT `fk_publisher` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (1,1,'6222f51f0eca27a82792f3ccf22ff1af178b58a94eb3958cdf00f1ac0262b8a5','2026-09-27 01:48:58',NULL,'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36','::1','2026-09-19 18:48:57'),(2,2,'6bdd8505d93a68815f004942ab829d4fa8fd1c3ddc4d4ce4fd766857c95c3c91','2026-09-27 05:04:18',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','::1','2026-09-19 22:04:18'),(3,2,'9d28cac588ed1491b37a55863fc014f975a385ab1c2a0e9524ab3827cce5d238','2026-09-27 05:06:46',NULL,'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36','::1','2026-09-19 22:06:46');
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

-- Dump completed on 2026-09-20  5:09:20
