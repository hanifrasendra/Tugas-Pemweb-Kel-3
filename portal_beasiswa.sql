-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 13, 2026 at 07:17 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portal_beasiswa`
--

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan`
--

CREATE TABLE `pengajuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  `deskripsi` text,
  `universitas` varchar(100) DEFAULT NULL,
  `prodi` varchar(100) DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `ukt` int DEFAULT NULL,
  `ipk` double(3,2) DEFAULT NULL,
  `tipe_beasiswa` enum('Prestasi','Reguler','Leadership') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pengajuan`
--

INSERT INTO `pengajuan` (`id`, `nama`, `deskripsi`, `universitas`, `prodi`, `semester`, `ukt`, `ipk`, `tipe_beasiswa`) VALUES
(1, 'Hanif Rasendra Putra', 'Beasiswa Prestasi', 'Universitas Pembangunan Nasional Veteran Jatim', 'Sistem Informasi', 5, NULL, 3.00, 'Reguler');

-- --------------------------------------------------------

--
-- Table structure for table `register_user`
--

CREATE TABLE `register_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--
-- Dumping data for table `register_user`
--

INSERT INTO `register_user` (`id`, `nama`, `email`, `password`) VALUES
(2, 'hanif rasendra putra', 'hanifrasendra297@gmail.com', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pengajuan`
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
