-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 09. Feb 2020 um 18:01
-- Server-Version: 10.1.36-MariaDB
-- PHP-Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `sketches`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sketches`
--

CREATE TABLE `sketches` (
  `sketchID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `path` varchar(300) NOT NULL,
  `divID` int(10) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `sketches`
--

INSERT INTO `sketches` (`sketchID`, `name`, `description`, `path`, `divID`, `timestamp`) VALUES
(5, 'Draw', 'Description for the drawing sketch', 'sketches/drawCircles/1.0/drawCircles1.0.js', 1000, '2019-12-27 15:06:24'),
(6, 'Bounce', 'Description for the bouncing sketch', 'sketches/bouncingBall/1.1/bouncingBall1.1.js', 1001, '2019-12-27 15:20:40'),
(7, 'Bounce Primitive', 'Description for the primitive bouncing sketch', 'sketches/bouncingBall/1.0/bouncingBall1.0.js', 1002, '2019-12-27 15:18:54'),
(8, 'RGB Background', 'This is the Placeholder A', 'sketches/color/rgbBackground/sketch.js', 1003, '2020-01-02 15:19:58'),
(9, 'Placeholder A', 'Description for the Placeholder A', 'sketches/placeholder/a/sketch.js', 7001, '2020-01-02 15:23:44'),
(10, 'Placeholder B', 'Description for the Placeholder B', 'sketches/placeholder/b/sketch.js', 7002, '2020-01-02 15:26:41');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `sketches`
--
ALTER TABLE `sketches`
  ADD PRIMARY KEY (`sketchID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `sketches`
--
ALTER TABLE `sketches`
  MODIFY `sketchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
