-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 25 Avril 2023 à 22:23
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `we4a_twitter_clone_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `follow`
--

CREATE TABLE `follow` (
  `follower_id` int(11) DEFAULT NULL,
  `followed_id` int(11) DEFAULT NULL COMMENT 'l''id de l''utilisateur que l''utilisateur suit',
  `follow_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `follow`
--

INSERT INTO `follow` (`follower_id`, `followed_id`, `follow_id`) VALUES
(26, 25, 27),
(27, 25, 31),
(27, 26, 32),
(29, 27, 35),
(29, 26, 36),
(30, 29, 38),
(29, 30, 39),
(29, 25, 40),
(31, 29, 41);

-- --------------------------------------------------------

--
-- Structure de la table `post_likes`
--

CREATE TABLE `post_likes` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `post_likes`
--

INSERT INTO `post_likes` (`like_id`, `user_id`, `post_id`) VALUES
(179, 25, 117),
(180, 25, 118),
(182, 26, 117),
(184, 26, 121),
(186, 29, 121),
(187, 29, 124),
(188, 29, 126),
(189, 31, 128),
(190, 31, 127),
(191, 31, 126),
(192, 31, 125),
(193, 31, 124);

-- --------------------------------------------------------

--
-- Structure de la table `post_reposts`
--

CREATE TABLE `post_reposts` (
  `repost_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `post_reposts`
--

INSERT INTO `post_reposts` (`repost_id`, `user_id`, `post_id`) VALUES
(26, 26, 117),
(28, 29, 121);

-- --------------------------------------------------------

--
-- Structure de la table `siteuser`
--

CREATE TABLE `siteuser` (
  `user_id` int(11) NOT NULL,
  `profile_picture_path` varchar(100) CHARACTER SET utf8mb4 DEFAULT 'images/default_pic.jpg',
  `name` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ref` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `password_hash` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `siteuser`
--

INSERT INTO `siteuser` (`user_id`, `profile_picture_path`, `name`, `ref`, `password_hash`) VALUES
(25, 'images/userPdp/1682435041257708.jpg', 'hugo', '@hugo', '$2y$10$mhtySq9IvJ6epedLqJHMvuhgfJFDcZE5c8oBE8duJHP6dvEkM7Tlm'),
(26, 'images/userPdp/1682435335265905.png', 'elonPusk', '@elonPusk', '$2y$10$/CmhauLk9WHXonqjnlhd7etdqen0CLr47HhaZhrk8iVIkQEarzE2u'),
(27, 'images/userPdp/1682435726273933.jpg', 'elonDusk', '@elonDusk', '$2y$10$YlXa9APgJltWf4CkOeu96OdyrTHcuOyZM.edHdql02l8osWrYJex2'),
(29, 'images/userPdp/1682449146291547.jfif', 'lois', '@lois', '$2y$10$AtEsjz6h5VCECnIreQdBHOoZz39Yg.SNwxDQhHbitv9nryVTT50NK'),
(30, 'images/default_pic.jpg', 'test', '@test', '$2y$10$ygD8ijw8sT4t5JBweaH76euKH6PTyL3vPMmgBmc.eOIGPN4up2B5q'),
(31, 'images/default_pic.jpg', 'f0rryx', '@f0rryx', '$2y$10$4zKs3uy/NsYqCDlIie6UTO.o.qTat3sNtKUmRes4oomvR.ECCtPcW');

-- --------------------------------------------------------

--
-- Structure de la table `trends`
--

CREATE TABLE `trends` (
  `trend_id` int(11) NOT NULL,
  `hashtag` varchar(100) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `trends`
--

INSERT INTO `trends` (`trend_id`, `hashtag`, `post_id`) VALUES
(23, '#lasagnes', 118),
(27, '#lasagnes', 125),
(29, '#test', 126),
(30, '#twitch', 129),
(31, '#live', 129),
(32, '#influencer', 130),
(33, '#netflix', 131),
(34, '#novel', 132),
(35, '#roman', 132);

-- --------------------------------------------------------

--
-- Structure de la table `userpost`
--

CREATE TABLE `userpost` (
  `post_id` int(11) NOT NULL,
  `content` varchar(280) CHARACTER SET utf8mb4 DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `repost` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `image_path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edited` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `userpost`
--

INSERT INTO `userpost` (`post_id`, `content`, `likes`, `repost`, `author_id`, `time`, `image_path`, `edited`) VALUES
(117, 'MAIS CE SITE EST --r[INCROYABLE]r-- !', 3, 2, 25, 1682435079, 'images/userImages/1682435112259540.png', 1),
(118, 'J\'aime beaucoup les #lasagnes', 1, 0, 25, 1682435144, '', NULL),
(120, 'Je suis Elon Dusk et j\'approuve l\'utilisateur @elonPusk', 0, 0, 27, 1682435669, '', NULL),
(121, 'Je suis Elon Pusk et j\'approuve ce site \r\n\r\n-///EnvoyÃ© depuis ma fusÃ©e///', 2, 1, 26, 1682435859, '', 1),
(124, 'blablabla\r\nje modifie ce post\r\n\r\n', 2, 0, 29, 1682449160, 'images/userImages/1682449182294510.png', 1),
(125, 'je fais des lasagne ce soir #lasagnes\r\n', 1, 0, 29, 1682449202, '', NULL),
(126, 'je test les trends #test', 2, 0, 29, 1682449243, '', 1),
(127, 'je crÃ©er un autre post pour le fun\r\n', 1, 0, 29, 1682461145, '', NULL),
(128, 'j\'aime jouer au jeux vidÃ©o', 1, 0, 29, 1682461207, 'images/userImages/1682461207292579.jpg', NULL),
(129, 'j\'aime regarder des live #twitch #live', 0, 0, 30, 1682461253, '', NULL),
(130, 'j\'aime regarder des vidÃ©o sur youtube #influencer\r\n', 0, 0, 31, 1682461283, '', NULL),
(131, 'j\'aime regarder des sÃ©ries #netflix ', 0, 0, 31, 1682461301, '', NULL),
(132, 'j\'aime lire #novel #roman', 0, 0, 29, 1682461404, '', NULL);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`follow_id`),
  ADD KEY `user_id` (`follower_id`),
  ADD KEY `follower_id` (`followed_id`);

--
-- Index pour la table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Index pour la table `post_reposts`
--
ALTER TABLE `post_reposts`
  ADD PRIMARY KEY (`repost_id`),
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `fk_post_id` (`post_id`);

--
-- Index pour la table `siteuser`
--
ALTER TABLE `siteuser`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `trends`
--
ALTER TABLE `trends`
  ADD PRIMARY KEY (`trend_id`),
  ADD UNIQUE KEY `unique_post_hashtag` (`post_id`,`trend_id`);

--
-- Index pour la table `userpost`
--
ALTER TABLE `userpost`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `author_id` (`author_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `follow`
--
ALTER TABLE `follow`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT pour la table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;
--
-- AUTO_INCREMENT pour la table `post_reposts`
--
ALTER TABLE `post_reposts`
  MODIFY `repost_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT pour la table `siteuser`
--
ALTER TABLE `siteuser`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT pour la table `trends`
--
ALTER TABLE `trends`
  MODIFY `trend_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT pour la table `userpost`
--
ALTER TABLE `userpost`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `siteuser` (`user_id`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `siteuser` (`user_id`);

--
-- Contraintes pour la table `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `siteuser` (`user_id`),
  ADD CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `userpost` (`post_id`);

--
-- Contraintes pour la table `post_reposts`
--
ALTER TABLE `post_reposts`
  ADD CONSTRAINT `fk_post_id` FOREIGN KEY (`post_id`) REFERENCES `userpost` (`post_id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `siteuser` (`user_id`);

--
-- Contraintes pour la table `trends`
--
ALTER TABLE `trends`
  ADD CONSTRAINT `fk_post_id_trends` FOREIGN KEY (`post_id`) REFERENCES `userpost` (`post_id`);

--
-- Contraintes pour la table `userpost`
--
ALTER TABLE `userpost`
  ADD CONSTRAINT `userpost_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `siteuser` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
