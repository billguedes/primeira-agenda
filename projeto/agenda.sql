SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE `pessoa` (
  `codigo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `observacao` text NOT NULL,
  PRIMARY KEY (`codigo`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `pessoa_apelido` (
  `codigo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pessoa_codigo` int(10) unsigned NOT NULL,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`codigo`),
  UNIQUE KEY `nome` (`nome`),
  KEY `pessoa_codigo` (`pessoa_codigo`),
  KEY `fk_pessoa_apelido_pessoa_idx` (`pessoa_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `pessoa_contato` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `pessoa_codigo` int(10) unsigned NOT NULL,
  `tipo_contato_codigo` int(10) unsigned NOT NULL,
  `descricao` varchar(150) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_pessoa_contato_pessoa_idx` (`pessoa_codigo`),
  KEY `fk_pessoa_contato_tipo_contato_idx` (`tipo_contato_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tipo_contato` (
  `codigo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `observacao` text NOT NULL,
  PRIMARY KEY (`codigo`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `pessoa_apelido`
  ADD CONSTRAINT `fk_pessoa_apelido_pessoa` FOREIGN KEY (`pessoa_codigo`) REFERENCES `pessoa` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `pessoa_contato`
  ADD CONSTRAINT `fk_pessoa_contato_pessoa` FOREIGN KEY (`pessoa_codigo`) REFERENCES `pessoa` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pessoa_contato_tipo_contato` FOREIGN KEY (`tipo_contato_codigo`) REFERENCES `tipo_contato` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
