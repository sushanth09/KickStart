-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2021 at 10:58 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kickstart`
--

-- --------------------------------------------------------

--
-- Table structure for table `startups`
--

CREATE TABLE `startups` (
  `id` int(10) NOT NULL,
  `company_name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `contact` varchar(40) NOT NULL,
  `product_name` varchar(40) NOT NULL,
  `problem_statement` varchar(100) NOT NULL,
  `industry` varchar(20) NOT NULL,
  `funding_goal` int(50) NOT NULL,
  `current_funds` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `startups`
--
ALTER TABLE `startups`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `startups`
--
ALTER TABLE `startups`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


-- --------------------------------------------------------

--
-- Table structure for table `investors`
--

CREATE TABLE `investors` (
  `id` int(11) NOT NULL,
  `fname` varchar(40) NOT NULL,
  `lname` varchar(40) NOT NULL,
  `venture_name` varchar(40) NOT NULL,
  `contact` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `investor_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for table `investors`
--
ALTER TABLE `investors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `investors`
--
ALTER TABLE `investors`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;



CREATE TABLE `investments` (
  `id` int(11) NOT NULL,
  `investor_id` int(11) NOT NULL,
  `startup_id` int(11) NOT NULL,
  `invested_amount` int(11) NOT NULL DEFAULT 0,
  `date_of_investment` datetime NOT NULL,
  `has_access` int DEFAULT 0,
  FOREIGN KEY(investor_id) REFERENCES investors(id),
  FOREIGN KEY(startup_id) REFERENCES startups(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `investments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `investors`
--
ALTER TABLE `investments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;