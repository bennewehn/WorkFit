-- phpMyAdmin SQL Dump
-- version 4.9.10
-- https://www.phpmyadmin.net/
--
-- Host: db5010643227.hosting-data.io
-- Erstellungszeit: 30. Okt 2022 um 05:35
-- Server-Version: 10.6.10-MariaDB-1:10.6.10+maria~deb11-log
-- PHP-Version: 7.0.33-0+deb9u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `dbs9005828`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Codes`
--

CREATE TABLE `Codes` (
  `userId` int(11) UNSIGNED DEFAULT NULL COMMENT 'May be null if user not created',
  `code` bigint(20) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Codes may be disabled if not payed etc'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Company`
--

CREATE TABLE `Company` (
  `companyId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `strasse` varchar(100) DEFAULT NULL COMMENT 'Straße und Hausnummer',
  `plz` int(10) UNSIGNED NOT NULL,
  `login` varchar(50) NOT NULL COMMENT 'username',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `EventCompanies`
--

CREATE TABLE `EventCompanies` (
  `eventId` int(11) NOT NULL,
  `compId` int(11) NOT NULL,
  `agreed` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=Noch nicht zugesagt; 1=Einverstanden'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='Zuordnung der Teilnehmenden Firmen an einem Event';

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Events`
--

CREATE TABLE `Events` (
  `eventid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `disciplines` varchar(50) NOT NULL DEFAULT 'Any' COMMENT 'Komma-Separierte Liste',
  `dstart` date NOT NULL DEFAULT current_timestamp() COMMENT 'Datum, an dem das Event startet',
  `dend` date NOT NULL COMMENT 'Datum, an dem das Event endet',
  `initiatorComp` int(11) NOT NULL COMMENT 'Initiierende Firma (ID)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `EventUsers`
--

CREATE TABLE `EventUsers` (
  `eventId` int(11) NOT NULL,
  `userId` int(11) UNSIGNED NOT NULL,
  `balance` double NOT NULL DEFAULT 0 COMMENT 'Anzahl Punkte, die der Nutzer im Event erreicht hat'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='Zuordnung der teilnehm. Nutzer an einem Event inkl Punktest.';

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `User`
--

CREATE TABLE `User` (
  `userId` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL COMMENT 'Account disabled / not registered yet if password NULL',
  `compID` int(11) NOT NULL,
  `balance` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Codes`
--
ALTER TABLE `Codes`
  ADD PRIMARY KEY (`code`),
  ADD KEY `Code-User` (`userId`);

--
-- Indizes für die Tabelle `Company`
--
ALTER TABLE `Company`
  ADD PRIMARY KEY (`companyId`);

--
-- Indizes für die Tabelle `EventCompanies`
--
ALTER TABLE `EventCompanies`
  ADD PRIMARY KEY (`eventId`,`compId`),
  ADD KEY `Compid-Compid` (`compId`);

--
-- Indizes für die Tabelle `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`eventid`),
  ADD KEY `EventInit-Company` (`initiatorComp`);

--
-- Indizes für die Tabelle `EventUsers`
--
ALTER TABLE `EventUsers`
  ADD PRIMARY KEY (`eventId`,`userId`),
  ADD KEY `User-User` (`userId`);

--
-- Indizes für die Tabelle `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `User-Company` (`compID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Codes`
--
ALTER TABLE `Codes`
  MODIFY `code` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Company`
--
ALTER TABLE `Company`
  MODIFY `companyId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Events`
--
ALTER TABLE `Events`
  MODIFY `eventid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `User`
--
ALTER TABLE `User`
  MODIFY `userId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Codes`
--
ALTER TABLE `Codes`
  ADD CONSTRAINT `Code-User` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `EventCompanies`
--
ALTER TABLE `EventCompanies`
  ADD CONSTRAINT `Compid-Compid` FOREIGN KEY (`compId`) REFERENCES `Company` (`companyId`),
  ADD CONSTRAINT `Eventid-Eventid` FOREIGN KEY (`eventId`) REFERENCES `Events` (`eventid`);

--
-- Constraints der Tabelle `Events`
--
ALTER TABLE `Events`
  ADD CONSTRAINT `EventInit-Company` FOREIGN KEY (`initiatorComp`) REFERENCES `Company` (`companyId`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `EventUsers`
--
ALTER TABLE `EventUsers`
  ADD CONSTRAINT `Event-Event` FOREIGN KEY (`eventId`) REFERENCES `Events` (`eventid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `User-User` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User-Company` FOREIGN KEY (`compID`) REFERENCES `Company` (`companyId`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
