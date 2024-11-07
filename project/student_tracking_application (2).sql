-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2024 at 04:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_tracking_application`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `userId`, `name`, `code`) VALUES
(1, 112230088, 'linear', '1234'),
(2, 112230088, 'physics', '1234'),
(3, 112230088, 'linear', '23344'),
(4, 112230088, 'vector', '7890'),
(9, 112230088, 'biology', '1234'),
(10, 112230088, 'ics', '1234'),
(11, 112230090, 'linear', '1234'),
(12, 112230090, 'css', '1115'),
(13, 112230090, 'dbms', '1212');

-- --------------------------------------------------------

--
-- Table structure for table `course_materials`
--

CREATE TABLE `course_materials` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_materials`
--

INSERT INTO `course_materials` (`id`, `courseId`, `title`, `url`) VALUES
(1, 1, 'something', 'http://localhost:3999/Uploads/file_1727868370209.pptx'),
(2, 4, 'pdf', 'http://localhost:3999/Uploads/file_1727868474685.docx'),
(3, 2, 'something', 'http://localhost:3999/Uploads/file_1727868525501.pptx'),
(10, 9, 'new', 'http://localhost:9999/Uploads/file_1727892870422.pptx'),
(11, 1, 'new', 'http://localhost:9999/Uploads/file_1727919939674.pdf'),
(12, 11, '1', 'http://localhost:9999/Uploads/file_1727969649340.pptx'),
(13, 12, '1', 'http://localhost:9999/Uploads/file_1727969737731.pptx');

-- --------------------------------------------------------

--
-- Table structure for table `exam_routines`
--

CREATE TABLE `exam_routines` (
  `id` int(11) NOT NULL,
  `day` varchar(50) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `course_code` varchar(50) NOT NULL,
  `classroom` varchar(50) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `exam_date` date NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exam_routines`
--

INSERT INTO `exam_routines` (`id`, `day`, `course_name`, `course_code`, `classroom`, `start_time`, `end_time`, `exam_date`, `userId`, `created_at`) VALUES
(2, 'saturday', 'dbms', '1111', '103', '00:57:00', '11:58:00', '2024-10-16', 112230088, '2024-10-03 05:57:19'),
(3, 'sunday', 'css', '1115', '13', '10:25:00', '22:25:00', '2024-10-28', 112230090, '2024-10-05 14:25:42');

-- --------------------------------------------------------

--
-- Table structure for table `global_chats`
--

CREATE TABLE `global_chats` (
  `indexNo` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `global_chats`
--

INSERT INTO `global_chats` (`indexNo`, `message`, `date`, `time`, `userId`) VALUES
(9, 'Hello, Everyone. How are you...?', '2024-09-20', '23:14:20', 112230083),
(10, 'I am fine and you...?', '2024-09-20', '23:14:52', 112230084),
(11, 'I am fine and you...?', '2024-09-20', '23:14:56', 112230085),
(12, 'I am also fine.', '2024-09-20', '23:15:14', 112230083),
(13, 'Will you go university tomorrow?', '2024-09-20', '23:15:40', 112230083),
(14, 'Yes.', '2024-09-20', '23:16:03', 112230084),
(15, 'Yes.', '2024-09-20', '23:16:07', 112230085),
(18, 'hi everyone', '2024-10-03', '19:42:14', 112230090),
(19, 'another', '2024-10-03', '19:55:03', 112230090);

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

CREATE TABLE `goals` (
  `indexNo` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `goals`
--

INSERT INTO `goals` (`indexNo`, `title`, `description`, `startTime`, `endTime`, `startDate`, `endDate`, `userId`) VALUES
(2, 'Daily study', 'This time I will study daily.', '18:00:00', '20:00:00', '2024-09-21', '2024-09-30', 112230083),
(3, 'Daily play Time', 'This time I will play daily.', '15:00:00', '18:00:00', '2024-09-19', '2024-09-30', 112230083),
(4, 'Daily Gaming Time', 'This time I will play daily.', '17:30:00', '19:30:00', '2024-09-20', '2024-09-28', 112230085),
(5, 'Daily Study Time', 'This time I will study daily.', '20:00:00', '22:30:00', '2024-09-20', '2024-09-28', 112230085),
(6, 'Daily Programming Time', 'This time I will writing code daily.', '23:00:00', '01:00:00', '2024-09-20', '2024-09-28', 112230085),
(7, 'Daily Study Time', 'This time I will study daily.', '18:30:00', '22:30:00', '2024-09-20', '2024-09-28', 112230084),
(8, 'Daily Programming Time', 'This time I will writing code daily.', '23:00:00', '02:30:00', '2024-09-20', '2024-09-28', 112230084),
(9, 'Daily Study Time', 'This time I will study daily.', '20:00:00', '22:30:00', '2024-09-19', '2024-09-28', 1122301000),
(10, 'chemistry', 'dsfv', '23:51:00', '23:50:00', '2024-10-29', '2024-10-29', 112230088),
(13, 'do project', 'within the date', '23:08:00', '12:09:00', '2024-10-14', '2024-10-24', 112230090);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `isRead` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_folders`
--

CREATE TABLE `personal_folders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personal_folders`
--

INSERT INTO `personal_folders` (`id`, `userId`, `name`) VALUES
(2, 112230088, 'new'),
(6, 112230088, 'some'),
(7, 112230090, 'naim folder'),
(8, 112230090, 'Project');

-- --------------------------------------------------------

--
-- Table structure for table `pf_materials`
--

CREATE TABLE `pf_materials` (
  `id` int(11) NOT NULL,
  `pfid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pf_materials`
--

INSERT INTO `pf_materials` (`id`, `pfid`, `title`, `url`) VALUES
(2, 2, 'another', 'http://localhost:9999/Uploads/file_1727923776234.pptx'),
(4, 6, 'new', 'http://localhost:9999/Uploads/file_1727924699145.pdf'),
(5, 7, 'new', 'http://localhost:9999/Uploads/file_1727969586271.pptx'),
(6, 8, 'project related', 'http://localhost:9999/Uploads/file_1728271838659.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `prayertimes`
--

CREATE TABLE `prayertimes` (
  `indexNo` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prayertimes`
--

INSERT INTO `prayertimes` (`indexNo`, `description`, `startTime`, `endTime`, `userId`) VALUES
(1, 'Fazar Time', '04:30:00', '04:59:59', 112230083),
(2, 'Fazar Time', '04:30:00', '04:59:59', 112230084),
(3, 'Fazar Time', '04:30:00', '04:59:59', 112230085),
(4, 'Zahar Time', '12:30:00', '14:59:59', 112230085),
(5, 'Zahar Time', '12:30:00', '14:59:59', 112230084),
(6, 'Zahar Time', '12:30:00', '14:59:59', 112230083),
(7, 'Asor Time', '16:30:00', '17:39:59', 112230083),
(8, 'Asor Time', '16:30:00', '17:39:59', 112230084),
(9, 'Asor Time', '16:30:00', '17:39:59', 112230085),
(10, 'Magrib Time', '18:01:00', '18:09:59', 112230085),
(11, 'Magrib Time', '18:01:00', '18:09:59', 112230084),
(12, 'Magrib Time', '18:01:00', '18:09:59', 112230083),
(13, 'Esha Time', '20:01:00', '23:59:59', 112230083),
(14, 'Esha Time', '20:01:00', '23:59:59', 112230084),
(24, 'fazar', '04:00:00', '04:51:00', 112230088),
(26, 'fazar', '04:14:00', '04:50:00', 112230090);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `courseId` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `title`, `courseId`, `url`) VALUES
(1, 'summer23mid', 1, 'http://localhost:9999/Uploads/file_1727918869357.docx'),
(2, 'summer23final', 1, 'http://localhost:9999/Uploads/file_1727918901908.pptx'),
(3, 'linear summer 23 mid', 1, 'http://localhost:9999/Uploads/file_1728139821493.pdf'),
(4, 'chemistry', 1, 'http://localhost:9999/Uploads/file_1728272055620.pptx');

-- --------------------------------------------------------

--
-- Table structure for table `solutions`
--

CREATE TABLE `solutions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `courseId` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `solutions`
--

INSERT INTO `solutions` (`id`, `title`, `courseId`, `url`) VALUES
(1, 'summer23mid', 1, 'http://localhost:9999/Uploads/file_1727919876534.pptx'),
(2, 'summer23databasemid', 1, 'http://localhost:9999/Uploads/file_1728271892610.jpeg'),
(3, 'another', 1, 'http://localhost:9999/Uploads/file_1728272476356.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `resetToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `email`, `password`, `photo`, `resetToken`) VALUES
(112230067, 'Mehedi Tamim', 'tamim@gmail.com', '$2b$10$MgTb/5ABql0.NbFch5Nr8e7tD1VhZSk0RYUrQUNt1zjFZZvVXWvb6', 'photo_1726809658167.jpeg', NULL),
(112230083, 'Muhammad Rafi', 'rafi@gmail.com', '$2b$10$Ffs1uDvwU6AGAdgYvLAjpudUMeawsFkV0m1CPTUzU3twqrJSePege', 'photo_1726809345205.jpeg', NULL),
(112230084, 'Shihab Ahmed', 'shihab@gmail.com', '$2b$10$sWLNzd8n4ghiPPGGVwQSK.ZhzEWocWNzp7ukf.Gvq2am0c1NjS8Ge', 'photo_1726809575745.avif', NULL),
(112230085, 'Fahim CHowdhuri', 'fahim@gmail.com', '$2b$10$0fvCf9y8a0BCpC.U4RMncuIcR9on3YNRiCPmu6MFyipajQrEP6VZS', 'photo_1726809472043.jpeg', NULL),
(112230087, 'Shurav Das', 'shurav@gmail.com', '$2b$10$euFIls00LFVeBeCiOKAfROwOszXVANvQjqKfcx2YbyW9HSZZ50C1G', 'photo_1726809605880.jpeg', NULL),
(112230088, 'Md mainul hossains fahim chowdhury', 'fahimhossain9121@gmail.com', '$2b$10$2tzsg6G72YOJO41Oqw04jeZj6W.Cb3hsNGCuPKsMUTlOqQBNyLD2S', 'photo_20200220_012904_038.jpg', NULL),
(112230090, 'Md naim hossain', 'naimhossain9121@gmail.com', '$2b$10$9GSrQSBpHHMw12ls0aPmg.RQa52okYlnEGgEoHjK6mDRJOTfu6.mS', 'photo_1727959914707.jpg', '9e31358f32539953d959442be49b8e3665cdb4e02f3655092d1e369abb485cc7'),
(1122301000, 'Sheikh Rafi', 'sheikhmrrafi.73@gmail.com', '$2b$10$S.DMJF/AaJpnOOmCQP2J8.ACvdzhVcIENoJIudYnR0qzeJ6kW766G', 'photo_1726839145376.jpeg', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `course_materials`
--
ALTER TABLE `course_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `exam_routines`
--
ALTER TABLE `exam_routines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`userId`);

--
-- Indexes for table `global_chats`
--
ALTER TABLE `global_chats`
  ADD PRIMARY KEY (`indexNo`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`indexNo`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `personal_folders`
--
ALTER TABLE `personal_folders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `pf_materials`
--
ALTER TABLE `pf_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pfid` (`pfid`);

--
-- Indexes for table `prayertimes`
--
ALTER TABLE `prayertimes`
  ADD PRIMARY KEY (`indexNo`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`,`title`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `solutions`
--
ALTER TABLE `solutions`
  ADD PRIMARY KEY (`id`,`title`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `course_materials`
--
ALTER TABLE `course_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `exam_routines`
--
ALTER TABLE `exam_routines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `global_chats`
--
ALTER TABLE `global_chats`
  MODIFY `indexNo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `goals`
--
ALTER TABLE `goals`
  MODIFY `indexNo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_folders`
--
ALTER TABLE `personal_folders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pf_materials`
--
ALTER TABLE `pf_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `prayertimes`
--
ALTER TABLE `prayertimes`
  MODIFY `indexNo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `solutions`
--
ALTER TABLE `solutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `course_materials`
--
ALTER TABLE `course_materials`
  ADD CONSTRAINT `course_materials_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `exam_routines`
--
ALTER TABLE `exam_routines`
  ADD CONSTRAINT `exam_routines_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `global_chats`
--
ALTER TABLE `global_chats`
  ADD CONSTRAINT `global_chats_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `goals`
--
ALTER TABLE `goals`
  ADD CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `personal_folders`
--
ALTER TABLE `personal_folders`
  ADD CONSTRAINT `personal_folders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `prayertimes`
--
ALTER TABLE `prayertimes`
  ADD CONSTRAINT `prayertimes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`);

--
-- Constraints for table `solutions`
--
ALTER TABLE `solutions`
  ADD CONSTRAINT `solutions_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
