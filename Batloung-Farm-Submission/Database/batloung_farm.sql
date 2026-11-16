-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: batloung_farm
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fruits`
--

DROP TABLE IF EXISTS `fruits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fruits` (
  `fruit_id` int NOT NULL AUTO_INCREMENT,
  `fruit_name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Available',
  PRIMARY KEY (`fruit_id`),
  UNIQUE KEY `fruit_name` (`fruit_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fruits`
--

LOCK TABLES `fruits` WRITE;
/*!40000 ALTER TABLE `fruits` DISABLE KEYS */;
INSERT INTO `fruits` VALUES (1,'Apples','Fresh red and green apples','Available'),(2,'Bananas','Fresh yellow bananas','Available'),(3,'Oranges','Fresh oranges','Available'),(4,'Mangoes','Fresh ripe mangoes','Available'),(5,'Grapes','Fresh green and red grapes','Available');
/*!40000 ALTER TABLE `fruits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_details`
--

DROP TABLE IF EXISTS `purchase_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_details` (
  `purchase_detail_id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int NOT NULL,
  `fruit_id` int NOT NULL,
  `quantity` int NOT NULL,
  `unit_cost` decimal(10,2) NOT NULL,
  `packaging_size` varchar(20) NOT NULL,
  PRIMARY KEY (`purchase_detail_id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `fruit_id` (`fruit_id`),
  CONSTRAINT `purchase_details_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`purchase_id`),
  CONSTRAINT `purchase_details_ibfk_2` FOREIGN KEY (`fruit_id`) REFERENCES `fruits` (`fruit_id`),
  CONSTRAINT `purchase_details_chk_1` CHECK ((`quantity` > 0)),
  CONSTRAINT `purchase_details_chk_2` CHECK ((`unit_cost` >= 0)),
  CONSTRAINT `purchase_details_chk_3` CHECK ((`packaging_size` in (_cp850'Small',_cp850'Medium',_cp850'Large')))
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_details`
--

LOCK TABLES `purchase_details` WRITE;
/*!40000 ALTER TABLE `purchase_details` DISABLE KEYS */;
INSERT INTO `purchase_details` VALUES (1,1,1,100,120.00,'Small'),(2,1,1,60,180.00,'Medium'),(3,1,1,40,250.00,'Large'),(4,1,2,80,90.00,'Small'),(5,1,2,40,140.00,'Medium'),(6,1,2,30,200.00,'Large'),(7,1,3,90,100.00,'Small'),(8,1,3,50,160.00,'Medium'),(9,1,3,30,220.00,'Large'),(10,2,4,60,150.00,'Small'),(11,2,4,40,220.00,'Medium'),(12,2,4,20,300.00,'Large'),(13,2,5,50,180.00,'Small'),(14,2,5,30,260.00,'Medium'),(15,2,5,20,350.00,'Large'),(16,3,1,2,50.00,'Small'),(17,4,4,120,567.00,'Medium');
/*!40000 ALTER TABLE `purchase_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `purchase_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`purchase_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,1,'2026-11-01',75200.00),(2,2,'2026-11-02',47600.00),(3,1,'2026-11-14',100.00),(4,4,'2026-11-15',68040.00);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `sale_id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int NOT NULL,
  `sale_date` date NOT NULL,
  `payment_status` enum('PAID','PARTIALLY_PAID','UNPAID') DEFAULT 'UNPAID',
  `payment_method` enum('CASH','MOBILE_MONEY','CREDIT') DEFAULT 'CREDIT',
  `amount_paid` decimal(10,2) DEFAULT '0.00',
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`sale_id`),
  KEY `vendor_id` (`vendor_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`),
  CONSTRAINT `sales_chk_1` CHECK ((`amount_paid` >= 0)),
  CONSTRAINT `sales_chk_2` CHECK ((`total_amount` >= 0)),
  CONSTRAINT `sales_chk_3` CHECK ((`amount_paid` <= `total_amount`))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,1,'2026-11-10','PARTIALLY_PAID','MOBILE_MONEY',4000.00,4240.00),(2,2,'2026-11-11','UNPAID','CREDIT',0.00,3360.00),(3,1,'2026-11-14','PAID','CASH',100.00,100.00),(4,2,'2026-11-15','PARTIALLY_PAID','MOBILE_MONEY',200.00,996.20);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_details`
--

DROP TABLE IF EXISTS `sales_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_details` (
  `sales_detail_id` int NOT NULL AUTO_INCREMENT,
  `sale_id` int NOT NULL,
  `fruit_id` int NOT NULL,
  `packaging_size` varchar(20) NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`sales_detail_id`),
  KEY `sale_id` (`sale_id`),
  KEY `fruit_id` (`fruit_id`),
  CONSTRAINT `sales_details_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`sale_id`),
  CONSTRAINT `sales_details_ibfk_2` FOREIGN KEY (`fruit_id`) REFERENCES `fruits` (`fruit_id`),
  CONSTRAINT `sales_details_chk_1` CHECK ((`quantity` > 0)),
  CONSTRAINT `sales_details_chk_2` CHECK ((`unit_price` >= 0)),
  CONSTRAINT `sales_details_chk_3` CHECK ((`packaging_size` in (_cp850'Small',_cp850'Medium',_cp850'Large')))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_details`
--

LOCK TABLES `sales_details` WRITE;
/*!40000 ALTER TABLE `sales_details` DISABLE KEYS */;
INSERT INTO `sales_details` VALUES (1,1,1,'Large',10,320.00),(2,1,2,'Small',8,130.00),(3,2,3,'Medium',6,210.00),(4,2,4,'Large',3,380.00),(5,2,5,'Small',4,240.00),(6,3,1,'Small',1,100.00),(7,4,3,'Large',20,49.81);
/*!40000 ALTER TABLE `sales_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `fruit_id` int NOT NULL,
  `packaging_size` varchar(20) NOT NULL,
  `available_quantity` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`stock_id`),
  UNIQUE KEY `fruit_id` (`fruit_id`,`packaging_size`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`fruit_id`) REFERENCES `fruits` (`fruit_id`),
  CONSTRAINT `stock_chk_1` CHECK ((`available_quantity` >= 0)),
  CONSTRAINT `stock_chk_2` CHECK ((`packaging_size` in (_cp850'Small',_cp850'Medium',_cp850'Large')))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,1,'Small',101),(2,1,'Medium',60),(3,1,'Large',30),(4,2,'Small',72),(5,2,'Medium',40),(6,2,'Large',30),(7,3,'Small',90),(8,3,'Medium',44),(9,3,'Large',10),(10,4,'Small',60),(11,4,'Medium',160),(12,4,'Large',17),(13,5,'Small',46),(14,5,'Medium',30),(15,5,'Large',20);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `business_name` varchar(100) NOT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `province` varchar(50) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Fresh Fruits SA','Lerato','0712345678','Gauteng','Johannesburg'),(2,'Green Valley Suppliers','Mpho','0723456789','Free State','Bloemfontein'),(3,'KwaZulu Fresh Produce','Pule','0734567890','KwaZulu-Natal','Durban'),(4,'Western Fruit Market','Palesa','0745678901','Western Cape','Cape Town'),(5,'Eastern Fresh Farm','Limpho','0756789012','Eastern Cape','East London'),(6,'Limpopo Fruit Suppliers','Puleng','0767890123','Limpopo','Polokwane'),(7,'Mpumalanga Fresh Farm','Neo','0778901234','Mpumalanga','Mbombela'),(8,'North West Produce','Boitumelo','0789012345','North West','Rustenburg');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `vendor_id` int NOT NULL AUTO_INCREMENT,
  `vendor_name` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  PRIMARY KEY (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'Lerato','58123456','Maseru','2026-10-01'),(2,'Mpho','59123456','Maputsoe','2026-10-05'),(3,'Pule','62123456','Mafeteng','2026-10-10');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-15 16:25:15
