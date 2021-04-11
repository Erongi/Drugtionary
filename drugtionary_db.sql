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
  `pg` varchar(200) NOT NULL,
  `pattern` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `NPT`;
CREATE TABLE `NPT` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `massage` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `TDT`;
CREATE TABLE `TDT` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `massage` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `IPT`;
CREATE TABLE `IPT` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `massage` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `CT`;
CREATE TABLE `CT` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `massage` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `description` text NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `gender` enum('ชาย','หญิง') NOT NULL,
  `age` int(11) NOT NULL,
  `image` varchar(200) NOT NULL,
  `symptom` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `medicals`;
CREATE TABLE `medicals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `gender` enum('ชาย','หญิง') NOT NULL,
  `age` int(11) NOT NULL,
  `image` varchar(200) NOT NULL,
  `specialist` varchar(200) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `patients` (`id`, `name`, `gender`, `age`, `image`, `symptom`) VALUES
('1', 'พัสกร อรุณสดใส', 'ชาย', '20', 'https://randomuser.me/api/portraits/women/1.jpg', 'เผ็ด'),
('2', 'วรนิช วรนุช', 'หญิง', '15', 'https://randomuser.me/api/portraits/women/12.jpg', 'หวาน');

INSERT INTO `drugs` (`id`, `name`, `group`, `type`, `properties`, `pg`,`image`, `pattern`) VALUES
('1', 'Abilify', 'ยาระงับอาการทางจิต', 'ยาตามใบสั่งแพทย์', 'รักษาโรคจิตเภท โรคไบโพลาร์ โรคซึมเศร้า กลุ่มอาการทูเร็ตต์','เด็กและผู้ใหญ่', 'drugs/Abilify.jpg', 'ยารับประทาน ยาฉีด'),
('2', 'Erythromycin', 'ยาปฏิชีวนะในกลุ่มแมคโครไลน์', 'ยาตามใบสั่งแพทย์', 'รักษาหรือป้องกันการติดเชื้อจากแบคทีเรีย','เด็กและผู้ใหญ่', 'drugs/Erythromycin.jpg', 'ยารับประทานชนิดแคปซูล ชนิดเม็ด ยาแขวนตะกอน ยาป้ายตา และยาฉีด');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;