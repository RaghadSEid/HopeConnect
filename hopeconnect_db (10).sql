-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2025 at 11:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hopeconnect_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `status` enum('Active','Not Active') NOT NULL DEFAULT 'Not Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`id`, `user_id`, `created_at`, `status`) VALUES
(1, 24, '2025-05-19 22:08:18', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `donation_id` int(11) NOT NULL,
  `donor_id` int(11) NOT NULL,
  `orphanage_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `category_description` varchar(50) NOT NULL,
  `donation_date` datetime DEFAULT current_timestamp(),
  `impact_description` text DEFAULT NULL,
  `review_comment` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `is_emergency` enum('True','False') NOT NULL DEFAULT 'False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`donation_id`, `donor_id`, `orphanage_id`, `category_name`, `category_description`, `donation_date`, `impact_description`, `review_comment`, `rating`, `is_emergency`) VALUES
(1, 1, 1, 'Education Support', 'Books and school supplies', '2025-05-15 20:45:34', 'Provided 10 school books to orphans', 'Great initiative. Happy to help!', 5, ''),
(2, 2, 1, 'Medical Aid', 'Healthcare and medicine', '2025-05-15 20:45:34', 'Covered the cost of 2 doctor visits and medicine.', 'Pleased with the transparency.', 4, ''),
(3, 3, 2, 'General Fund', 'Daily needs and maintenance', '2025-05-15 20:45:34', 'Helped with food and basic needs for a week.', 'Hope this helps the kids.', 5, ''),
(4, 4, 2, 'Education Support', 'Tuition fees and uniforms', '2025-05-15 20:45:34', 'Paid partial tuition for 1 student.', 'Nice platform to donate through.', 4, ''),
(6, 2, 2, '250', 'Education Support', '2025-05-20 13:04:10', 'Provided school materials', 'happy for help', 5, ''),
(7, 2, 2, '250', 'Education Support', '2025-05-22 13:21:46', NULL, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `donation_payments`
--

CREATE TABLE `donation_payments` (
  `id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `paid_amount` decimal(10,2) DEFAULT NULL,
  `transaction_fee` decimal(10,2) DEFAULT 0.00,
  `net_amount` decimal(10,2) DEFAULT NULL,
  `paid_at` datetime DEFAULT current_timestamp(),
  `transaction_fee_percent` decimal(5,4) DEFAULT 0.0200
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donation_payments`
--

INSERT INTO `donation_payments` (`id`, `donation_id`, `payment_method`, `transaction_id`, `status`, `paid_amount`, `transaction_fee`, `net_amount`, `paid_at`, `transaction_fee_percent`) VALUES
(1, 8, 'Visa', 'TXN10001ABC', 'refunded', 180.00, 7.20, 172.80, '2025-05-10 12:30:00', 0.0400),
(2, 9, 'MasterCard', 'TXN10002DEF', 'successful', 50.00, 2.00, 48.00, '2025-05-11 14:45:00', 0.0400),
(4, 8, 'Visa', 'TXN20250519XYZ', 'successful', 200.00, 8.00, 192.00, NULL, 0.0400),
(5, 8, 'Visa', 'TXN20250519XYZ', 'successful', 200.00, 8.00, 192.00, NULL, 0.0400);

-- --------------------------------------------------------

--
-- Table structure for table `donation_requests`
--

CREATE TABLE `donation_requests` (
  `id` int(11) NOT NULL,
  `orphanage_id` int(11) NOT NULL,
  `request_type` enum('clothes','food','books','other') NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('pending','in_transit','delivered','cancelled') DEFAULT 'pending',
  `requested_at` datetime DEFAULT current_timestamp(),
  `is_emergency` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donation_requests`
--

INSERT INTO `donation_requests` (`id`, `orphanage_id`, `request_type`, `description`, `status`, `requested_at`, `is_emergency`) VALUES
(1, 1, 'clothes', 'Winter clothes for 20 children aged 5-10', 'pending', '2025-05-10 10:30:00', 0),
(2, 2, 'food', 'Monthly food supply for 30 orphans', 'in_transit', '2025-05-08 14:00:00', 0),
(3, 1, 'books', 'School books for grade 3 to 5', 'pending', '2025-05-11 09:00:00', 0),
(4, 3, 'other', 'First aid kits and hygiene products', 'delivered', '2025-04-28 12:15:00', 0),
(5, 1, 'food', 'Need food supplies for next month', '', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `donors`
--

CREATE TABLE `donors` (
  `donor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donors`
--

INSERT INTO `donors` (`donor_id`, `user_id`) VALUES
(1, 5),
(2, 6),
(3, 7),
(4, 8),
(10, 15);

-- --------------------------------------------------------

--
-- Table structure for table `human_requests`
--

CREATE TABLE `human_requests` (
  `request_id` int(11) NOT NULL,
  `orphanage_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `date_requested` date NOT NULL,
  `status` enum('completed','not completed') DEFAULT 'not completed',
  `is_emergency` enum('True','False') NOT NULL DEFAULT 'False',
  `skill_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `human_requests`
--

INSERT INTO `human_requests` (`request_id`, `orphanage_id`, `description`, `date_requested`, `status`, `is_emergency`, `skill_id`) VALUES
(1, 1, 'Need doctors to perform health checkups for 20 children.', '2025-05-01', '', 'False', NULL),
(2, 2, 'Requesting volunteers for teaching math and science.', '2025-05-05', '', 'False', NULL),
(3, 3, 'Looking for professionals to mentor teenagers.', '2025-05-08', '', 'False', NULL),
(4, 2, 'We need a doctor to visit 20 children', '2025-05-20', '', 'False', 2),
(5, 2, 'Need mentoring for teenagers during summer.', '2025-06-01', '', 'False', 3),
(6, 5, 'Need mentoring for teenagers during summer.', '2025-05-20', '', 'False', 3),
(7, 5, 'Need mentoring for teenagers during summer.', '2025-05-20', '', 'False', 2),
(8, 5, 'Need mentoring for teenagers during summer.', '2025-05-20', '', 'False', 2),
(9, 5, 'Need mentoring for teenagers during summer.', '2025-05-20', '', 'False', 2),
(10, 5, 'Need mentoring for teenagers during summer.', '2025-05-20', 'not completed', 'False', 2),
(11, 5, 'Need mentoring for teenagers during summer.', '2025-05-20', 'not completed', 'False', 2);

-- --------------------------------------------------------

--
-- Table structure for table `logistics_tasks`
--

CREATE TABLE `logistics_tasks` (
  `id` int(11) NOT NULL,
  `donation_id` int(11) DEFAULT NULL,
  `delivery_id` int(11) DEFAULT NULL,
  `origin_address` varchar(255) DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `status` enum('pending','in_progress','completed') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logistics_tasks`
--

INSERT INTO `logistics_tasks` (`id`, `donation_id`, `delivery_id`, `origin_address`, `scheduled_at`, `status`) VALUES
(1, 1, 1, 'Warehouse A - Gaza', '2025-05-20 10:00:00', 'pending'),
(4, 1, 1, 'Al-Shati Warehouse - Gaza', '2025-05-20 14:30:00', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `created_at`) VALUES
(76, 9, 'A new orphan has been added. If you like to sponsor them', '2025-05-22 21:30:19'),
(77, 10, 'A new orphan has been added. If you like to sponsor them', '2025-05-22 21:30:19'),
(78, 37, 'A new orphan has been added. If you like to sponsor them', '2025-05-22 21:30:19'),
(79, 38, 'A new orphan has been added. If you like to sponsor them', '2025-05-22 21:30:19'),
(80, 39, 'A new orphan has been added. If you like to sponsor them', '2025-05-22 21:30:19'),
(81, 10, 'The orphan (Sara Omar) you were sponsoring is no longer available.', '2025-05-22 21:32:45'),
(82, 10, 'Your sponsorship request for Ahmad Updated has been approved.', '2025-05-22 21:42:01'),
(83, 1, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(84, 2, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(85, 3, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(86, 4, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(87, 6, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(88, 7, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(89, 8, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(90, 9, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(91, 10, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(92, 15, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(93, 16, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(94, 17, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(95, 18, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(96, 19, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(97, 20, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(98, 21, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(99, 22, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(100, 36, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(101, 37, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(102, 38, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20'),
(103, 39, '???? Emergency: A new urgent campaign needs your support! Please help if you can. ????', '2025-05-22 22:00:20');

-- --------------------------------------------------------

--
-- Table structure for table `orphanages`
--

CREATE TABLE `orphanages` (
  `orphanage_id` int(11) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orphanages`
--

INSERT INTO `orphanages` (`orphanage_id`, `verified`, `user_id`) VALUES
(1, 0, 17),
(2, 0, 18),
(3, 0, 19),
(4, 0, 20),
(5, 0, 21),
(6, 0, 22);

-- --------------------------------------------------------

--
-- Table structure for table `orphans`
--

CREATE TABLE `orphans` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `education_status` varchar(100) NOT NULL,
  `health_condition` varchar(255) NOT NULL,
  `orphanage_id` int(11) NOT NULL,
  `status` enum('Available','Not Available') NOT NULL DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orphans`
--

INSERT INTO `orphans` (`id`, `name`, `age`, `education_status`, `health_condition`, `orphanage_id`, `status`) VALUES
(1, 'Ahmad Updated', 16, 'Grade 5', 'Good', 1, 'Available'),
(2, 'Sara Omar', 13, 'Secondary', 'Fair', 1, 'Not Available'),
(3, 'Yousef Nabil', 11, 'None', 'Poor', 3, 'Available'),
(8, 'Omar', 8, 'Primary School', 'Good', 6, 'Available'),
(9, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(10, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(11, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(12, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(13, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(14, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(15, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(16, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(17, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(18, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(19, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(20, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(21, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(22, 'Khaled Hassan', 9, 'Primary School', 'Good', 1, 'Available'),
(23, ' Hassan', 9, 'Primary School', 'Good', 2, 'Not Available'),
(24, ' Hassan', 9, 'Primary School', 'Good', 2, 'Available'),
(25, ' Hassan', 9, 'Primary School', 'Good', 2, 'Available'),
(26, ' Hassan', 9, 'Primary School', 'Good', 2, 'Available'),
(27, ' Hassan', 9, 'Primary School', 'Good', 2, 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `orphan_updates`
--

CREATE TABLE `orphan_updates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `orphan_id` int(11) NOT NULL,
  `update_type` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orphan_updates`
--

INSERT INTO `orphan_updates` (`id`, `orphan_id`, `update_type`, `description`, `image_url`, `created_at`) VALUES
(2, 1, 'report', 'He passed the exam!', '/images/1747939688538-11.png', '2025-05-02 12:06:22'),
(3, 1, 'medical', 'New periodic inspection', NULL, '2025-05-02 12:06:38'),
(4, 2, 'medical', '\nA routine blood test was performed on the child.', '/images/medical report.jpg', '2025-05-02 12:08:22'),
(7, 1, 'report', 'He passed the exam!', '/images/school.png', '2025-05-09 06:17:35'),
(33, 1, 'profile_update', 'Orphan profile updated: age, education_status', NULL, '2025-05-22 17:43:41'),
(36, 1, 'profile_update', 'Orphan profile updated: age, education_status', NULL, '2025-05-22 18:09:09'),
(37, 1, 'profile_update', 'Orphan profile updated: age, education_status', NULL, '2025-05-22 18:31:07'),
(38, 23, 'status_change', 'This orphan is no longer available.', NULL, '2025-05-22 18:32:02'),
(39, 2, 'status_change', 'This orphan is no longer available.', NULL, '2025-05-22 18:32:45'),
(40, 1, 'photo', 'New periodic inspection', NULL, '2025-05-22 18:47:05');

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `partnership_type` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partners`
--

INSERT INTO `partners` (`id`, `name`, `contact_email`, `phone_number`, `partnership_type`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Health Support Org', 'info@healthsupport.org', '+972-987-6543', 'Healthcare Partner', 'Partners for medical aid and healthcare services.', '2025-05-16 11:12:39', '2025-05-16 11:12:39'),
(3, 'Education Trust', 'admin@educationtrust.net', '+972-555-7890', 'Educational Partner', 'Supports education-related donations and programs.', '2025-05-16 11:12:39', '2025-05-16 11:12:39'),
(4, 'Food Relief Network', 'support@foodrelief.net', '+972-222-3333', 'Logistics Partner', 'Helps with food distribution and logistics coordination.', '2025-05-16 11:12:39', '2025-05-16 11:12:39'),
(5, 'Global Relief Org', 'info@globalrelief.org', '+972-111-2222', 'Relief Partner', 'Provides emergency relief services.', '2025-05-22 21:58:25', '2025-05-22 21:58:25');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `skill_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`skill_id`, `name`) VALUES
(9, 'cccc'),
(11, 'ccؤcc'),
(2, 'Medical'),
(3, 'Mentoring'),
(6, 'Teachdding'),
(1, 'Teaching'),
(8, 'Teacرhdding'),
(5, 'Txeaching');

-- --------------------------------------------------------

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `id` int(11) NOT NULL,
  `sponsorship_type` enum('monthly','one-time','annually') DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sponsors`
--

INSERT INTO `sponsors` (`id`, `sponsorship_type`, `user_id`) VALUES
(1, 'one-time', 9),
(2, 'monthly', 10),
(11, 'annually', 37),
(12, NULL, 38),
(13, NULL, 39);

-- --------------------------------------------------------

--
-- Table structure for table `sponsorships`
--

CREATE TABLE `sponsorships` (
  `id` int(11) NOT NULL,
  `orphan_id` int(11) DEFAULT NULL,
  `sponsor_id` int(11) DEFAULT NULL,
  `category_name` varchar(100) DEFAULT NULL,
  `categories_description` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `donation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Available','Not Available','Pending Approval','Rejected') DEFAULT 'Pending Approval'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sponsorships`
--

INSERT INTO `sponsorships` (`id`, `orphan_id`, `sponsor_id`, `category_name`, `categories_description`, `quantity`, `donation_date`, `status`) VALUES
(1, 1, 2, 'Education Support', 'Updated school support', 50, '2025-05-08 15:40:37', 'Pending Approval'),
(2, 2, 2, 'Education Support', 'Funds tuition, books, and school fees', 2, '2025-05-08 15:40:37', 'Not Available'),
(3, 3, 1, 'Medical Aid', 'Covers healthcare costs for children.', 5, '2025-05-08 15:40:37', 'Pending Approval'),
(4, NULL, 2, 'Payment', 'money', NULL, '2025-05-08 15:40:37', 'Pending Approval'),
(7, 1, 1, 'Payment', 'money', NULL, '2025-05-11 13:08:52', 'Pending Approval'),
(8, 1, 1, NULL, 'clothes', NULL, '2025-05-15 13:42:22', 'Pending Approval'),
(9, 1, 2, 'Education Support', 'Monthly school fees', 1, '2025-05-17 07:39:32', 'Not Available'),
(10, 1, 2, 'education', 'education ssponsorships', 1, '2025-05-16 21:00:00', 'Pending Approval'),
(11, 1, 2, 'Education Support', 'Monthly school fees', 1, '2025-05-17 10:59:41', 'Pending Approval'),
(12, 1, 2, 'Education Support', 'Monthly school fees', 1, '2025-05-17 12:49:43', 'Pending Approval'),
(13, 1, 2, 'Education Support', 'Monthly school fees', 1, '2025-05-17 21:23:59', 'Pending Approval'),
(14, 1, 2, 'Education Support', 'Updated school support', 20, '2025-05-22 18:41:04', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `role` enum('donor','sponsor','volunteer','admin','orphanages','delivery') NOT NULL,
  `status` enum('Active','Suspended') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `phone`, `location`, `role`, `status`, `created_at`) VALUES
(1, 'Ahmed Ali', 'ahmed.ali@example.com', '$2b$10$e0NRXyKx7G...hashed_password...', '0123456789', 'Cairo, Egypt', 'donor', 'Active', '2025-05-16 13:42:42'),
(2, 'Sarah Mohamed', 'sarah.mohamed@example.com', '$2b$10$abcd1234efgh5678ijklmnopqrstuvwx', '0987654321', 'Dubai, UAE', 'volunteer', 'Active', '2025-05-16 13:42:42'),
(3, 'Khaled Youssef', 'khaled.youssef@example.com', '$2b$10$mnopqrs1234567tuvwxyzabcd890efgh', '0112233445', 'Riyadh, Saudi Arabia', 'volunteer', 'Active', '2025-05-16 13:42:42'),
(4, 'Nada Ibrahim', 'nada.ibrahim@example.com', '$2b$10$zyxwvutsrqponmlkjihgfedcba987654', '0109988776', 'Amman, Jordan', 'volunteer', 'Active', '2025-05-16 13:42:42'),
(5, 'Mohammad ', 'ali.hassan@example.com', '$2b$10$abcdefghijklmnopqrstuvwx1234567', '0598765432', 'Gaza City', 'donor', 'Suspended', '2025-05-16 13:42:42'),
(6, 'Mona Salem', 'mona.salem@example.com', '$2b$10$passw0rdhashhhhhhhhhhh1', '0111122233', 'Alexandria, Egypt', 'donor', 'Active', '2025-05-18 09:00:00'),
(7, 'Youssef Nabil', 'youssef.nabil@example.com', '$2b$10$passw0rdhashhhhhhhhhhh2', '0101010101', 'Jeddah, Saudi Arabia', 'donor', 'Active', '2025-05-18 09:00:00'),
(8, 'Rana Fadel', 'rana.fadel@example.com', '$2b$10$passw0rdhashhhhhhhhhhh3', '0999988776', 'Doha, Qatar', 'donor', 'Active', '2025-05-18 09:00:00'),
(9, 'Lina Ahmad', 'lina.ahmad@example.com', '$2b$10$sponsorHashExample01', '0123456700', 'Muscat, Oman', 'sponsor', 'Active', '2025-05-18 11:00:00'),
(10, 'Tariq Salem', 'tariq.salem@example.com', '$2b$10$sponsorHashExample02', '0112233556', 'Manama, Bahrain', 'sponsor', 'Active', '2025-05-18 11:00:00'),
(15, 'Ahmad Khaled', 'ahmad@example.com', '$2b$10$K2iIrGJwqlk.L6RO4AZa2OBnxfGW9OYe0DtcfwBNL.X97icIhE5nG', '0599999999', 'Gaza', 'donor', 'Active', '2025-05-18 15:56:17'),
(16, 'Ahmad Khaled', 'ahmad@example.com', '$2b$10$f6gTrZSK.0x63QXz1r3oCOUi5AlnxQL2qZgFCMBofBJUhu8P0VGBi', '0599999999', 'Gaza', 'volunteer', 'Active', '2025-05-18 15:57:22'),
(17, 'Gaza Hope Orphanage', 'gaza.hope@orphans.org', '$2b$10$hash1', '0599000001', 'Gaza City', 'orphanages', 'Active', '2025-05-20 02:42:00'),
(18, 'Return Martyrs Foundation', 'return.martyrs@orphans.org', '$2b$10$hash2', '0599000002', 'Gaza City', 'orphanages', 'Active', '2025-05-20 02:42:00'),
(19, 'Gaza Dignity Home', 'gaza.dignity@orphans.org', '$2b$10$hash3', '0599000003', 'Gaza City', 'orphanages', 'Active', '2025-05-20 02:42:00'),
(20, 'Al-Aqsa Charity Home', 'alaqsa.charity@orphans.org', '$2b$10$hash4', '0599000004', 'Gaza City', 'orphanages', 'Active', '2025-05-20 02:42:00'),
(21, 'Palestine Children House', 'pal.kids@orphans.org', '$2b$10$hash5', '0599000005', 'Gaza City', 'orphanages', 'Active', '2025-05-20 02:42:00'),
(22, 'Gaza Hope Orphanage2', 'gaza.hope@orphans.org', '$2b$10$hash1', '0599000001', 'Gaza City', 'orphanages', 'Active', '2025-05-20 02:45:27'),
(36, 'Bayan', 'Bayan@example.com', '$2b$10$qcjCAnlp.paXsdZN41SGL.Uz3WYIye/eSNToX.uFofXVD/EqSPUIG', '0599999999', 'Gaza', 'admin', 'Active', '2025-05-22 13:30:23'),
(37, 'Raghad', 's12112270@stu.najah.edu', '$2b$10$kE9zL6d6hGp3hWxlIlcCVevATXnupLNpo2wfyiapDhzEtcoH.U3Gy', '0599999999', 'Gaza', 'sponsor', 'Active', '2025-05-22 14:44:43'),
(38, 'raghad', 'raghad@example.com', '$2b$10$7dzyq2qxoh2bTc./ArPwceKYOWWfeAfEHsUM/MOi9u.S.WciYssG6', '0599999999', 'Gaza', 'sponsor', 'Active', '2025-05-22 18:14:14'),
(39, 'raghad', 'raghad@example.com', '$2b$10$xrtIZuSkw4JAVfCxRcTkGu2TrP49dWPgk8D4JL3B0FPKQ4aaSM27i', '0599999999', 'Gaza', 'sponsor', 'Active', '2025-05-22 18:20:46');

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

CREATE TABLE `volunteers` (
  `volunteer_id` int(11) NOT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteers`
--

INSERT INTO `volunteers` (`volunteer_id`, `availability`, `user_id`) VALUES
(1, 'Weekdays', 2),
(2, 'Weekdays', 3),
(3, 'Weeksssssdays', 4),
(5, 'Weekdays after 6 PM', 16);

-- --------------------------------------------------------

--
-- Table structure for table `volunteer_requests`
--

CREATE TABLE `volunteer_requests` (
  `id` int(11) NOT NULL,
  `volunteer_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `status` enum('pending','accepted','rejected','confirmed') DEFAULT 'pending',
  `assigned_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteer_requests`
--

INSERT INTO `volunteer_requests` (`id`, `volunteer_id`, `request_id`, `status`, `assigned_date`) VALUES
(13, 1, 8, 'pending', '2025-05-20 06:43:35'),
(14, 2, 8, 'pending', '2025-05-20 06:43:35'),
(15, 1, 9, 'pending', '2025-05-20 07:03:06'),
(16, 2, 9, 'pending', '2025-05-20 07:03:06'),
(17, 1, 10, 'pending', '2025-05-20 12:05:02'),
(18, 2, 10, 'pending', '2025-05-20 12:05:02'),
(19, 1, 11, 'pending', '2025-05-20 16:30:56'),
(20, 2, 11, 'pending', '2025-05-20 16:30:56'),
(21, 3, 11, 'pending', '2025-05-20 16:30:56');

-- --------------------------------------------------------

--
-- Table structure for table `volunteer_skills`
--

CREATE TABLE `volunteer_skills` (
  `volunteer_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteer_skills`
--

INSERT INTO `volunteer_skills` (`volunteer_id`, `skill_id`) VALUES
(1, 1),
(1, 2),
(1, 5),
(2, 1),
(2, 2),
(2, 5),
(3, 1),
(3, 2),
(3, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `delivery_agent_ibfk_1` (`user_id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `orphanage_id` (`orphanage_id`);

--
-- Indexes for table `donation_payments`
--
ALTER TABLE `donation_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donation_id` (`donation_id`);

--
-- Indexes for table `donation_requests`
--
ALTER TABLE `donation_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orphanage_id` (`orphanage_id`);

--
-- Indexes for table `donors`
--
ALTER TABLE `donors`
  ADD PRIMARY KEY (`donor_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `human_requests`
--
ALTER TABLE `human_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `orphanage_id` (`orphanage_id`),
  ADD KEY `fk_request_skill` (`skill_id`);

--
-- Indexes for table `logistics_tasks`
--
ALTER TABLE `logistics_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donation_id` (`donation_id`),
  ADD KEY `delivery_id` (`delivery_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orphanages`
--
ALTER TABLE `orphanages`
  ADD PRIMARY KEY (`orphanage_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orphans`
--
ALTER TABLE `orphans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test` (`orphanage_id`);

--
-- Indexes for table `orphan_updates`
--
ALTER TABLE `orphan_updates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orphan_id` (`orphan_id`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`skill_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sponsorships`
--
ALTER TABLE `sponsorships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orphan_id` (`orphan_id`),
  ADD KEY `sponsor_id` (`sponsor_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`volunteer_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `volunteer_requests`
--
ALTER TABLE `volunteer_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `volunteer_id` (`volunteer_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `volunteer_skills`
--
ALTER TABLE `volunteer_skills`
  ADD PRIMARY KEY (`volunteer_id`,`skill_id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `donation_payments`
--
ALTER TABLE `donation_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `donation_requests`
--
ALTER TABLE `donation_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `donors`
--
ALTER TABLE `donors`
  MODIFY `donor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `human_requests`
--
ALTER TABLE `human_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `logistics_tasks`
--
ALTER TABLE `logistics_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `orphanages`
--
ALTER TABLE `orphanages`
  MODIFY `orphanage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orphans`
--
ALTER TABLE `orphans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `orphan_updates`
--
ALTER TABLE `orphan_updates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `sponsorships`
--
ALTER TABLE `sponsorships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `volunteer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `volunteer_requests`
--
ALTER TABLE `volunteer_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `donors` (`donor_id`),
  ADD CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`orphanage_id`) REFERENCES `orphanages` (`orphanage_id`);

--
-- Constraints for table `donation_requests`
--
ALTER TABLE `donation_requests`
  ADD CONSTRAINT `donation_requests_ibfk_1` FOREIGN KEY (`orphanage_id`) REFERENCES `orphanages` (`orphanage_id`);

--
-- Constraints for table `donors`
--
ALTER TABLE `donors`
  ADD CONSTRAINT `donors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `human_requests`
--
ALTER TABLE `human_requests`
  ADD CONSTRAINT `fk_request_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `human_requests_ibfk_1` FOREIGN KEY (`orphanage_id`) REFERENCES `orphanages` (`orphanage_id`);

--
-- Constraints for table `logistics_tasks`
--
ALTER TABLE `logistics_tasks`
  ADD CONSTRAINT `logistics_tasks_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`donation_id`),
  ADD CONSTRAINT `logistics_tasks_ibfk_2` FOREIGN KEY (`delivery_id`) REFERENCES `delivery` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orphanages`
--
ALTER TABLE `orphanages`
  ADD CONSTRAINT `orphanages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orphans`
--
ALTER TABLE `orphans`
  ADD CONSTRAINT `test` FOREIGN KEY (`orphanage_id`) REFERENCES `orphanages` (`orphanage_id`);

--
-- Constraints for table `orphan_updates`
--
ALTER TABLE `orphan_updates`
  ADD CONSTRAINT `orphan_updates_ibfk_1` FOREIGN KEY (`orphan_id`) REFERENCES `orphans` (`id`);

--
-- Constraints for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD CONSTRAINT `sponsors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `sponsorships`
--
ALTER TABLE `sponsorships`
  ADD CONSTRAINT `sponsorships_ibfk_1` FOREIGN KEY (`orphan_id`) REFERENCES `orphans` (`id`),
  ADD CONSTRAINT `sponsorships_ibfk_4` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors` (`id`);

--
-- Constraints for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD CONSTRAINT `volunteers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `volunteer_requests`
--
ALTER TABLE `volunteer_requests`
  ADD CONSTRAINT `volunteer_requests_ibfk_1` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers` (`volunteer_id`),
  ADD CONSTRAINT `volunteer_requests_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `human_requests` (`request_id`);

--
-- Constraints for table `volunteer_skills`
--
ALTER TABLE `volunteer_skills`
  ADD CONSTRAINT `volunteer_skills_ibfk_1` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers` (`volunteer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `volunteer_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
