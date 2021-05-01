-- -------------------------------------------------------------
-- TablePlus 3.12.4(360)
--
-- https://tableplus.com/
--
-- Database: drugtionary
-- Generation Time: 2564-03-24 16:41:03.5400
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `drugs`;
CREATE TABLE `drugs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `group` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  `properties` varchar(200) NOT NULL,
  `patient_group` varchar(200) NOT NULL,
  `pattern` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `NPT`;
CREATE TABLE `NPT` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `TDT`;
CREATE TABLE `TDT` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `IPT`;
CREATE TABLE `IPT` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `CT`;
CREATE TABLE `CT` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` bigint(20) NOT NULL,
  `drug_id` bigint(20) NOT NULL,
  `drug_name` varchar(200) NOT NULL,
  `date` varchar(200) NOT NULL,
  `time` varchar(200) NOT NULL,
  `amount` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `symptom` varchar(200) NOT NULL,
  `medical_id` bigint(20),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `medicals`;
CREATE TABLE `medicals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `position` varchar(200) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `token` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_UN` (`token`),
  KEY `token_FK` (`user_id`),
  CONSTRAINT `token_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('ชาย','หญิง') NOT NULL,
  `role` enum('patient','medical') NOT NULL DEFAULT 'patient',
  `email` varchar(100) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `join_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

INSERT INTO `patients` (`id`, `name`, `gender`, `age`, `image`, `symptom`, `medical_id`) VALUES
('1', 'พัสกร อรุณสดใส', 'ชาย', '20', 'https://randomuser.me/api/portraits/women/1.jpg', 'เผ็ด', NULL),
('2', 'วรนิช วรนุช', 'หญิง', '15', 'https://randomuser.me/api/portraits/women/12.jpg', 'หวาน', NULL);


INSERT INTO `medicals` (`id`, `name`, `gender`, `age`, `image`, `position`, `description`) VALUES
('1', 'พญ.วันวิสาข์ ตันศิริเจริญกุล', 'ชาย', '40', 'https://i.pinimg.com/736x/6b/eb/5d/6beb5d8607e0a9bb2e3d5b82b09cbfe1.jpg', 'รองผู้อำนวยการโรงพยาบาลฌชนต์ราราช', 'Doctor of Medicine, Faculty of Medicine, Chiang Mai University. Certificate of Orthopedic surgery, Faculty of Medicine, Chiang Mai University. Fellowship in Bone and Soft tissue Tumour, Mayo Clinic, USA, 2005 Master degree of Biomedical Science in clinical research, Mayo Graduated School, Rochester, Minnesota, USA, 2005 Clinical Visitor in Joint Replacement Surgery for Hip and Knee, Western Ontario University, Canada, 2006 Master of Business Administration, Payap University, 2009');

INSERT INTO `drugs` (`id`, `name`, `group`, `type`, `properties`, `patient_group`,`image`, `pattern`) VALUES
('1', 'Abilify', 'ยาระงับอาการทางจิต', 'ยาตามใบสั่งแพทย์', 'รักษาโรคจิตเภท โรคไบโพลาร์ โรคซึมเศร้า กลุ่มอาการทูเร็ตต์','เด็กและผู้ใหญ่', 'drugs/Abilify.jpg', 'ยารับประทาน ยาฉีด'),
('2', 'Erythromycin', 'ยาปฏิชีวนะในกลุ่มแมคโครไลน์', 'ยาตามใบสั่งแพทย์', 'รักษาหรือป้องกันการติดเชื้อจากแบคทีเรีย','เด็กและผู้ใหญ่', 'drugs/Erythromycin.jpg', 'ยารับประทานชนิดแคปซูล ชนิดเม็ด ยาแขวนตะกอน ยาป้ายตา และยาฉีด');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;