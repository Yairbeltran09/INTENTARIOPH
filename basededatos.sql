-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bitacora_bd
CREATE DATABASE IF NOT EXISTS `bitacora_bd` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bitacora_bd`;

-- Volcando estructura para tabla bitacora_bd.base_refrigeradora
CREATE TABLE IF NOT EXISTS `base_refrigeradora` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_compra` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.base_refrigeradora: ~1 rows (aproximadamente)
INSERT INTO `base_refrigeradora` (`id`, `descripcion`, `estado`, `fecha_compra`, `marca`, `modelo`, `serial`) VALUES
	(1, 'Base Refrigeradora para apollar el portatil', 'Bueno', '2024/04/15', 'Jaltech', 'Jaltech', 'Jaltech');

-- Volcando estructura para tabla bitacora_bd.canal_transmision
CREATE TABLE IF NOT EXISTS `canal_transmision` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.canal_transmision: ~6 rows (aproximadamente)
INSERT INTO `canal_transmision` (`id`, `nombre`) VALUES
	(1, 'COBRE'),
	(2, 'FIBRA DEDICADA'),
	(3, 'FIBRA OPTICA'),
	(4, 'HFC'),
	(5, 'MODEM'),
	(6, 'RADIO ENLACE');

-- Volcando estructura para tabla bitacora_bd.ciudades
CREATE TABLE IF NOT EXISTS `ciudades` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_ciudad` varchar(255) DEFAULT NULL,
  `id_departamento` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKluxkynt0d5ul681goeee0tcnv` (`id_departamento`),
  CONSTRAINT `FKluxkynt0d5ul681goeee0tcnv` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.ciudades: ~103 rows (aproximadamente)
INSERT INTO `ciudades` (`id`, `nombre_ciudad`, `id_departamento`) VALUES
	(1, 'ACHI', 2),
	(2, 'ALTOS DEL ROSARIO', 2),
	(3, 'ARENAL', 2),
	(4, 'ARJONA', 2),
	(5, 'ARROYOHONDO', 2),
	(6, 'BARANOA', 1),
	(7, 'BARRANCO DE LOBA', 2),
	(8, 'BARRANQUILLA', 1),
	(9, 'BETULIA ', 5),
	(10, 'BUENA VISTA', 3),
	(11, 'CALAMAR', 2),
	(12, 'CAMPO D LA CRUZ', 1),
	(13, 'CANALETE', 3),
	(14, 'CANDELARIA', 1),
	(15, 'CARMEN DE BOLIVAR', 2),
	(16, 'CARTAGENA', 2),
	(17, 'CERETE', 3),
	(18, 'CHALAN', 5),
	(19, 'CHIMA', 3),
	(20, 'CHINU', 3),
	(21, 'CICUCO', 2),
	(22, 'CIENAGA ', 4),
	(23, 'CIENAGA DE ORO', 3),
	(24, 'COLOSO', 5),
	(25, 'CORDOBA', 2),
	(26, 'COROZAL', 5),
	(27, 'COTORRA', 3),
	(28, 'EL BANCO ', 4),
	(30, 'EL GUAMO', 2),
	(31, 'EL PENON', 2),
	(32, 'EL SALADO', 2),
	(33, 'GALAPA', 1),
	(34, 'GALERAS', 5),
	(35, 'GUAMAL', 4),
	(36, 'HATILLO DE LOBA', 2),
	(37, 'JUAN DE ACOSTA', 1),
	(38, 'LA UNION ', 5),
	(39, 'LORICA', 3),
	(40, 'LOS PALMITOS', 5),
	(41, 'MAGANGUE', 2),
	(42, 'MAHATES', 2),
	(43, 'MAJAGUAL', 5),
	(44, 'MALAMBO', 1),
	(45, 'MARIA LA BAJA', 2),
	(46, 'MOMIL', 3),
	(47, 'MOMPOS', 2),
	(48, 'MONITOS', 3),
	(49, 'MONTECRISTO', 2),
	(50, 'MONTELIBANO', 3),
	(51, 'MONTERIA', 3),
	(52, 'MORROA', 5),
	(53, 'NOROSI', 2),
	(54, 'NUEVA GRANADA', 4),
	(55, 'OVEJAS', 4),
	(56, 'PALENQUE', 2),
	(57, 'PINILLOS', 2),
	(58, 'PIVIJAY', 4),
	(59, 'PLANETA RICA', 3),
	(60, 'PLATO', 4),
	(61, 'PUEBLO NUEVO', 3),
	(62, 'PUERTO ESCONDIDO', 3),
	(63, 'PUERTO LIBERTADOR', 3),
	(64, 'PURISIMA', 3),
	(65, 'REGIDOR', 2),
	(66, 'REPELON', 1),
	(67, 'RIO VIEJO', 2),
	(68, 'SABANAGRANDE', 1),
	(69, 'SABANALARGA', 1),
	(70, 'SAHAGUN', 3),
	(71, 'SALAMINA', 4),
	(72, 'SAMPUES', 5),
	(73, 'SAN ANDRES DE SOTAVENTO', 3),
	(74, 'SAN ANTERO', 3),
	(75, 'SAN BERNARDO DEL VIENTO', 3),
	(76, 'SAN CRISTOBAL ', 2),
	(77, 'SAN JACINTO', 2),
	(78, 'SAN JACINTO DEL CAUCA', 2),
	(79, 'SAN JUAN DE NEPUMUCENO', 2),
	(80, 'SAN MARCOS', 5),
	(81, 'SAN ONOFRE', 5),
	(82, 'SAN PEDRO', 5),
	(83, 'SAN PELAYO', 3),
	(84, 'SAN SEBASTIAN', 2),
	(85, 'SANTA ANA', 4),
	(86, 'SANTA MARTA', 4),
	(87, 'SANTA ROSA', 2),
	(88, 'SIMITI', 2),
	(89, 'SINCE', 5),
	(90, 'SINCELEJO', 5),
	(91, 'SOLEDAD', 1),
	(92, 'SOPLAVIENTO', 2),
	(93, 'SUAN', 1),
	(94, 'TALAIGUA NUEVO', 2),
	(95, 'TIERRA ALTA', 3),
	(96, 'TIQUISIO', 2),
	(97, 'TIQUISIO NUEVO', 2),
	(98, 'TOLU', 5),
	(99, 'TOLUVIEJO', 5),
	(100, 'TUCHIN', 3),
	(101, 'TURBACO', 2),
	(102, 'TURBANA', 2),
	(103, 'VILLANUEVA', 2),
	(104, 'ZAMBRANO', 2);

-- Volcando estructura para tabla bitacora_bd.departamentos
CREATE TABLE IF NOT EXISTS `departamentos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name_departamento` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.departamentos: ~5 rows (aproximadamente)
INSERT INTO `departamentos` (`id`, `name_departamento`) VALUES
	(1, 'ATLANTICO'),
	(2, 'BOLIVAR'),
	(3, 'CORDOBA'),
	(4, 'MAGDALENA'),
	(5, 'SUCRE');

-- Volcando estructura para tabla bitacora_bd.diademas
CREATE TABLE IF NOT EXISTS `diademas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_compra` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.diademas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.envio_de_modems
CREATE TABLE IF NOT EXISTS `envio_de_modems` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `costo_envio` decimal(38,2) DEFAULT NULL,
  `estado_envio` varchar(255) DEFAULT NULL,
  `fecha_envio` varbinary(255) DEFAULT NULL,
  `id_farmacia` bigint(20) DEFAULT NULL,
  `id_modem` bigint(20) DEFAULT NULL,
  `id_proveedor_envio` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7ifq5pmbotjtwnjw6jxvevime` (`id_farmacia`),
  KEY `FKbcgjh5fb18a91h9hqwpk0hifx` (`id_modem`),
  KEY `FK5v0fundbdmpb4rk8xyfm02m4p` (`id_proveedor_envio`),
  CONSTRAINT `FK5v0fundbdmpb4rk8xyfm02m4p` FOREIGN KEY (`id_proveedor_envio`) REFERENCES `proveedor_envio` (`id`),
  CONSTRAINT `FK7ifq5pmbotjtwnjw6jxvevime` FOREIGN KEY (`id_farmacia`) REFERENCES `farmacias` (`id`),
  CONSTRAINT `FKbcgjh5fb18a91h9hqwpk0hifx` FOREIGN KEY (`id_modem`) REFERENCES `modems` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.envio_de_modems: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.farmacias
CREATE TABLE IF NOT EXISTS `farmacias` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `anchobanda` varchar(255) DEFAULT NULL,
  `coordenadas` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `pertenece` varchar(255) DEFAULT NULL,
  `canal_transmision` bigint(20) DEFAULT NULL,
  `ciudad` bigint(20) DEFAULT NULL,
  `departamento` bigint(20) DEFAULT NULL,
  `proveedor` bigint(20) DEFAULT NULL,
  `regente` bigint(20) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo9ix3t854bns7f8b7jw34tkui` (`canal_transmision`),
  KEY `FKl00pbjhfkqrykk54lxs9ui73u` (`ciudad`),
  KEY `FK2s5iukvprm9rsdh5a7xax7xao` (`departamento`),
  KEY `FKdieijjf6xy2c0dygvefd02h3m` (`proveedor`),
  KEY `FKny8wpb1cu69uatkl91lq52yjt` (`regente`),
  CONSTRAINT `FK2s5iukvprm9rsdh5a7xax7xao` FOREIGN KEY (`departamento`) REFERENCES `departamentos` (`id`),
  CONSTRAINT `FKdieijjf6xy2c0dygvefd02h3m` FOREIGN KEY (`proveedor`) REFERENCES `proveedor_internet` (`id`),
  CONSTRAINT `FKl00pbjhfkqrykk54lxs9ui73u` FOREIGN KEY (`ciudad`) REFERENCES `ciudades` (`id`),
  CONSTRAINT `FKny8wpb1cu69uatkl91lq52yjt` FOREIGN KEY (`regente`) REFERENCES `regente` (`id`),
  CONSTRAINT `FKo9ix3t854bns7f8b7jw34tkui` FOREIGN KEY (`canal_transmision`) REFERENCES `canal_transmision` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.farmacias: ~143 rows (aproximadamente)
INSERT INTO `farmacias` (`id`, `anchobanda`, `coordenadas`, `direccion`, `nombre`, `pertenece`, `canal_transmision`, `ciudad`, `departamento`, `proveedor`, `regente`, `is_deleted`) VALUES
	(11, '10', '11.236221, -74.194383', 'CRA 7 #8-70, CALLE LAS DELICIAS', 'SAF ACHI', 'PHARMASER', 2, 1, 2, 28, NULL, b'0'),
	(12, '12', '"10.477152, -73.255601', 'CALLE 22 #19-52', 'SAF ALCÁZARES', 'CONSORCIO', 2, 86, 4, 35, NULL, b'0'),
	(13, '500', '10.951416, -74.775685', 'BARRIO LAS NIEVES CRA 12 #18-115', 'SAF ALLEGRA', 'CONSORCIO', 2, 8, 1, 28, NULL, b'0'),
	(14, '120', '8.792380, -74.163448', 'CALLE LAS PIEDRAS CRA 9 #15-17 ', 'SAF ALTOS DEL ROSARIO', 'CONSORCIO', 2, 2, 2, 27, NULL, b'0'),
	(15, '10', '10.252880, -75.342409', 'BARRIO EL CARMEN, CALLE 26 #35-280', 'SAF ARENAL', 'PHARMASER', 3, 3, 2, 28, NULL, b'0'),
	(16, '10', '10.251381, -75.020934', 'CRA 39 #49-1, BARRIO POZO REAL', 'SAF ARJONA', 'CONSORCIO', 2, 4, 2, 58, NULL, b'0'),
	(17, '30', '10.914180, -74.773237', 'CRA 4A #3-17', 'SAF ARROYO HONDO', 'CONSORCIO', 2, 5, 2, 64, NULL, b'0'),
	(18, '10', '10.217001, -75.441267', 'CALLE 26 #14-14', 'SAF BAHIA', 'CONSORCIO', 3, 91, 1, 58, NULL, b'0'),
	(19, '25', '8.945953, -74.107657', 'CRA 6A #2-3 P 1 APTO 1', 'SAF BALLESTAS', 'CONSORCIO', 2, 102, 2, 6, NULL, b'0'),
	(20, '10', '10°55\'51,-74°47\'56', 'CRA 19 #20 49 APTO 1 BARANOA', 'SAF BARANOA', 'PHARMASER', 6, 6, 1, 28, NULL, b'0'),
	(21, '10', '10.534384, -75.397205', 'CALLE SANTANDER CRA 10 #13-40', 'SAF BARRANCO DE LOBA', 'CONSORCIO', 2, 7, 2, 54, NULL, b'0'),
	(22, '30', '9.272708, -75.246475', 'CRA 11 #8-26 ANILLO VIAL', 'SAF BAYUNCA', 'CONSORCIO', 3, 16, 2, 6, NULL, b'0'),
	(23, '700', '10.253095, -74.913739', 'TRANSVERSAL 9A  #10-40, BARRIO LA PAZ', 'SAF BETULIA ', 'CONSORCIO', 3, 9, 5, 11, NULL, b'0'),
	(24, '10', '10.378201, -74.883528', 'VIA MAMONAL SECTOR BELLAVISTA N. 7C- 39 LOCALES 15-16-17', 'SAF BLOCKPORT', 'PHARMASER', 6, 16, 2, 28, NULL, b'0'),
	(25, '50', '8.786679, -76.239877', 'CALLE 9 #7-71 BARRIO CENTRO', 'SAF BUENA VISTA', 'PHARMASER', 3, 10, 3, 28, NULL, b'0'),
	(26, '100', '10.389334, -75.476140', 'CRA 4 #20-65', 'SAF CALAMAR', 'CONSORCIO', 2, 11, 2, 64, NULL, b'0'),
	(27, '10', '10.336569, -75.414798', 'CALLE 9 #4-116', 'SAF CAMPO DE LA CRUZ', 'CONSORCIO', 2, 12, 1, 68, NULL, b'0'),
	(28, '12', '10.960285, -74.800709', 'CRA 2 7-41 APTO 02 FRENTE A MUTUAL SER LUIS FELIPE CAUSIL', 'SAF CANALETE', 'CONSORCIO', 3, 13, 3, 58, NULL, b'0'),
	(29, 'ILIMITADO', '9.541204, -75.312132', 'BARRIO CANAPOTE CALLE 60 #16-23 - CALLE 61 #16-06 ', 'SAF CANAPOTE', 'CONSORCIO', 5, 16, 2, 35, NULL, b'0'),
	(30, '10', '9.274591, -74.646065', 'CORREGIMIENTO CANAVERAL CALLE BLAZ DE LESO #24-94', 'SAF CAÑAVERAL', 'CONSORCIO', 5, 101, 2, 64, NULL, b'0'),
	(31, '200', '11.010329, -74.249599', 'BARRIO SANTANDER - CALLE 25 ENTRE LA CRA 40 Y 41', 'SAF CARMEN DE BOLIVAR', 'PHARMASER', 3, 15, 2, 28, NULL, b'0'),
	(32, '20', '8.874787, -75.624406', 'CALLE 47 #16-96', 'SAF CEVILLAR NAZARETH', 'CONSORCIO', 6, 8, 1, 58, NULL, b'0'),
	(33, '20', '9.492102, -75.352231', 'CRA 7 # 5-03 BARRIO CENTRO', 'SAF CHALAN', 'CONSORCIO', 2, 18, 5, 64, NULL, b'0'),
	(34, '20', '10.379313, -75.480481', 'CALLE 4 #10-49', 'SAF CHIMA', 'PHARMASER', 3, 19, 3, 28, NULL, b'0'),
	(35, '10', '9.316791, -75.293921', 'CARRERA 8 # 23 - 31', 'SAF CHINU', 'PHARMASER', 2, 20, 3, 28, NULL, b'0'),
	(36, '10', '9.039017, -75.800718', 'CRA 4 #15-69, SECTOR LA CANDELARIA', 'SAF CICUCO', 'CONSORCIO', 2, 21, 2, 50, NULL, b'0'),
	(37, '20', '9.009767, -73.973120', 'CALLE 11 #13 -33', 'SAF CIENAGA - MAGDALENA', 'CONSORCIO', 3, 22, 4, 49, NULL, b'0'),
	(38, '60', '10.958341, -74.824448', 'CRA 15 #10B - 35 BARRIO 6 DE ENERO', 'SAF CIENAGA DE ORO', 'CONSORCIO', 3, 23, 3, 64, NULL, b'0'),
	(39, '30', '8.753631, -75.885952', 'CRA 5 #7-53 BARRIO SAN MIGUEL', 'SAF COLOSO', 'CONSORCIO', 3, 24, 5, 30, NULL, b'0'),
	(40, '30', '10.034780, -74.976038', 'BARRIO CONSOLATA MANZANA H LOTE 16 B', 'SAF CONSOLATA', 'CONSORCIO', 3, 16, 2, 58, NULL, b'0'),
	(41, '15', '8.990164, -73.948527', 'BARRIO LOS GUAYACANES CRA 8 # 2-753', 'SAF CORDOBA', 'PHARMASER', 2, 25, 2, 28, NULL, b'0'),
	(42, '10', '10.406081, -75.454518', 'CRA 24 #32- 07 BARRIO SAN MIGUEL', 'SAF COROZAL', 'CONSORCIO', 2, 26, 5, 64, NULL, b'0'),
	(43, '20', '10.961767, -74.840672', 'CALLE 15  13A-148 BARRIO SANTA LUCIA', 'SAF COTORRA', 'CONSORCIO', 6, 27, 3, 18, NULL, b'0'),
	(44, '5', '11.00045, -74.80407', 'CALLE 9 #18B-55 BARRIO PUEBLO NUEVO', 'SAF EL BANCO', 'CONSORCIO', 3, 28, 4, 52, NULL, b'0'),
	(45, '10', '10.897593, -74.886775', 'CRA 9G #80-224 BARRIO SOURDIS', 'SAF EL BOSQUE', 'CONSORCIO', 3, 8, 1, 35, NULL, b'0'),
	(47, '10', '9.146679, -74.225682', ' CRA 6 #25-45 LOCAL 04 BARRIO CHUCHURUBI', 'SAF EL ENCANTO', 'CONSORCIO', 2, 51, 3, 58, NULL, b'0'),
	(48, '20', '8.955760, -74.077837', ' CRA 6 #25 - 45 LOC 04 BARRIO CHUCHURUBI', 'SAF EL ENCANTO (MONTERIA)', 'CONSORCIO', 2, 51, 3, 58, NULL, b'0'),
	(49, '15', '10.830641, -75.031462', 'CALLE GRANDE #28-64', 'SAF EL GUAMO', 'CONSORCIO', 3, 30, 2, 63, NULL, b'0'),
	(50, '10', '10.957566, -74.892012', 'CALLE BOLIVAR CALLE 4 #4- 44', 'SAF EL PEÑÓN', 'CONSORCIO', 3, 31, 2, 53, NULL, b'0'),
	(51, '150', '8.730497, -75.889411', 'T 54 87 83 MZ 41 Lo 17', 'SAF EL POZON', 'CONSORCIO', 3, 16, 2, 35, NULL, b'0'),
	(52, '6 MB', '11.031472, -74.865075', 'CALLE 117 #11B-12', 'SAF EL PUEBLO', 'CONSORCIO', 3, 8, 1, 38, NULL, b'0'),
	(53, '100 GB', '8,8489810, -75,2807500', 'BARRIO CENTRO, CENTRO DE SALUD EL SALADO', 'SAF EL SALADO', 'PHARMASER', 3, 32, 2, 64, NULL, b'0'),
	(54, '100', '11.037662, -74.825281', 'CRA 53 #74-86', 'SAF FIRENZE', 'CONSORCIO', 3, 8, 1, 35, NULL, b'0'),
	(55, '200', '9.380189, -75.269545', 'CALLE 12 #16-05', 'SAF GALAPA', 'CONSORCIO', 3, 33, 1, 35, NULL, b'0'),
	(56, '10', '8.9172574,-74.4648639', 'CALLE 11 CRA 11-2', 'SAF GALERAS', 'CONSORCIO', 2, 34, 5, 57, NULL, b'0'),
	(57, '10', '9.247910, -74.761155', 'CALLE 8 #4-70 CALLE RICAURTE, BARRIO CENTRO', 'SAF GUAMAL', 'CONSORCIO', 4, 35, 4, 29, NULL, b'0'),
	(58, '15', '10.235462, -75.195175', 'CALLE 4 #7-77', 'SAF HATILLO DE LOBA', 'CONSORCIO', 3, 36, 2, 54, NULL, b'0'),
	(59, '80', '10.139502, -75.227753', 'CALLE 6  #3-5, CALLE GRANDE', 'SAF JUAN DE ACOSTA', 'CONSORCIO', 3, 37, 1, 47, NULL, b'0'),
	(60, '100', '10.859171, -74.774290', 'CALLE 7 #9-36', 'SAF JUAN MINA', 'CONSORCIO', 3, 8, 1, 35, NULL, b'0'),
	(61, '60', '9.983922, -75.302131', 'CRA 49  30A-67 APTO 1 ', 'SAF KALAMARI', 'PHARMASER', 2, 16, 2, 28, NULL, b'0'),
	(62, '200', '10.950725, -74.811434', 'CRA 9 # 3 -74', 'SAF LA GLORIA (MONTERIA)', 'CONSORCIO', 4, 51, 3, 35, NULL, b'0'),
	(63, '12', '9.237169, -75.676497', 'CALLE 14 #12-16 LOCAL 2', 'SAF LA PLAYA', 'CONSORCIO', 2, 8, 1, 35, NULL, b'0'),
	(64, '10', '9.241443, -74.425890', 'CALLE 14 #8-18 AVENIDA NUÑEZ LOCAL-3', 'SAF LA UNIÓN', 'CONSORCIO', 3, 38, 5, 4, NULL, b'0'),
	(65, '60', '8.295797, -74.473371', 'CRA 79A #109-04', 'SAF LAS FLORES', 'CONSORCIO', 3, 8, 1, 58, NULL, b'0'),
	(66, '15', '8.754585, -75.887039', 'CRA 7  #10-41 CALLE REAL', 'SAF LOS PALMITOS', 'CONSORCIO', 3, 40, 5, 8, NULL, b'0'),
	(67, '10', '9.247057, -76.130136', 'CRA 4 #15-69 SECTOR LA CANDELARIA', 'SAF LOS PINILLOS', 'CONSORCIO', 3, 57, 2, 58, NULL, b'0'),
	(68, '30', '9.333477, -75.305363', 'CALLE 16 # 18A - 30 BARRIO SAN MARTIN', 'SAF MAGANGUE', 'CONSORCIO', 2, 41, 2, 58, NULL, b'0'),
	(69, '10', '8,524261, -74,039223', 'BARRIO SANTANDER CALLE 16 #42-41', 'SAF MAHATES', 'CONSORCIO', 2, 42, 2, 58, NULL, b'0'),
	(70, '10', '10.970220, -74.823230', 'CALLE 7 #10-13', 'SAF MAJAGUAL', 'PHARMASER', 2, 43, 5, 28, NULL, b'0'),
	(71, '15', '9.801850, -74.393115', 'PLAZA PPAL CRA 12 CALLE 12-9 ', 'SAF MALAGANA', 'CONSORCIO', 4, 42, 2, 33, NULL, b'0'),
	(72, '30', '10.407299, -75.497814', 'CALLE 10 #17-75 CENTRO', 'SAF MALAMBO', 'CONSORCIO', 2, 44, 1, 64, NULL, b'0'),
	(73, '25', '8.886084, -75.789285', 'CRA 14 #19-45 PLAZA PRINCIPAL (CRA 14  CLL 19-219 LOCAL 113 INTERIOR)', 'SAF MARIALABAJA', 'CONSORCIO', 2, 45, 2, 58, NULL, b'0'),
	(74, '20', '9.525068, -75.230903', 'CORDIALIDAD CALLE 56 #6-20', 'SAF MOKANA', 'CONSORCIO', 2, 91, 1, 58, NULL, b'0'),
	(75, '15', '10.103639, -75.199457', 'CALLE 8 #10-67 a 10-1 MOMIL CORDOBA', 'SAF MOMIL', 'CONSORCIO', 3, 46, 3, 10, NULL, b'0'),
	(76, '90', '8.996084, -74.456288', 'CALLE 19 #2A- 56 APT 2', 'SAF MOMPOX', 'CONSORCIO', 3, 47, 2, 59, NULL, b'0'),
	(77, '10', '10.287480, -75.518687', 'CALLE PRINCIPAL DE MONTECRISTO CALLE 2 #8-04', 'SAF MONTECRISTO', 'CONSORCIO', 3, 49, 2, 36, NULL, b'0'),
	(78, '10', '9.792888, -74.782283', 'CRA 6 #16-56 MONTELIBANO', 'SAF MONTELIBANO', 'PHARMASER', 2, 50, 3, 28, NULL, b'0'),
	(79, '100', '8.77713, -75.86439', 'CALLE 26 ENTRE  3-38  1 y 4 unir dos locales (B y C)', 'SAF MONTERIA', 'CONSORCIO', 3, 51, 3, 35, NULL, b'0'),
	(80, '60', '8.501.628, -75.507.841', 'BARRIO BURRCHE CALLE 23  #56-68', 'SAF MONTES DE MARIA', 'PHARMASER', 2, 15, 2, 28, NULL, b'0'),
	(81, '60', '9.017438, -76.263228', 'CRA 3 # 23C - 31, BARRIO CENTRO', 'SAF MOÑITOS', 'CONSORCIO', 3, 48, 3, 24, NULL, b'0'),
	(82, '10', '9.235125, -75.722437', 'CRA 4 CALLE 6-32 PISO 1 LOTE 3 BARRIO RINCON', 'SAF MORROA', 'CONSORCIO', 3, 52, 5, 64, NULL, b'0'),
	(83, '5', '8°39\'56.6"N 73°49\'22.7"W', 'BARRIO ALTOS DEL CARMEN CALLE PRINCIPAL # 9A 16', 'SAF NOROSI', 'CONSORCIO', 6, 53, 2, 15, NULL, b'0'),
	(84, '200', '10.494740, -75.125455', 'DIAGONAL 77D 15D - 92, BARRIO LA MANGA', 'SAF NUEVA ERA', 'CONSORCIO', 3, 8, 1, 35, NULL, b'0'),
	(85, '15', '8.586901, -73.839854', 'CALLE 6 ENTRE CRAS 7 Y 8 BARRIO CENTRO', 'SAF NUEVA GRANADA', 'CONSORCIO', 3, 54, 4, 32, NULL, b'0'),
	(86, '100', '10.790653, -74.757444', 'CALLEJON SAN ANTONIO #52-57', 'SAF OLAYA', 'CONSORCIO', 3, 16, 2, 35, NULL, b'0'),
	(87, '30', '10.631082, -74.922913', 'CALLEJON SAN ANTONIO #52-57', 'SAF OLAYA', 'CONSORCIO', 2, 16, 2, 35, NULL, b'0'),
	(88, '20', '8.947651, -75.442238', 'CRA 12 CALLE 11-41 APTO 03 - LA ESPERANZA', 'SAF ORO BLANCO', 'CONSORCIO', 3, 17, 3, 58, NULL, b'0'),
	(89, '20', '9.181731, -75.378375', 'CALLE 21 #13-34 CENTRO', 'SAF OVEJAS', 'CONSORCIO', 6, 55, 5, 65, NULL, b'0'),
	(90, '10', '9.372719, -75.762230', 'CRA 11 #19-64, BARRIO ABAJO, PALENQUE - MAHATES', 'SAF PALENQUE', 'CONSORCIO', 6, 56, 2, 64, NULL, b'0'),
	(91, '10', '9.353021, -75.953661', 'CALLE 4 #7-48 CORREGIMIENTO PALENQUITO', 'SAF PALENQUITO', 'CONSORCIO', 6, 57, 2, 44, NULL, b'0'),
	(92, '10', '9.306753, -75.401283', 'CALLE TAMARINDO CRA 9 #22-75', 'SAF PASACABALLOS', 'CONSORCIO', 2, 16, 2, 64, NULL, b'0'),
	(93, '10', '10.082591, -75.139715', 'CALLE 10 #10-48', 'SAF PIVIJAY', 'PHARMASER', 2, 58, 4, 28, NULL, b'0'),
	(94, '60', '10.396773, -75.067378', 'CRA 6 N° 19-25  BARRIO CENTRO DIAGONAL ANTIGUO MACU', 'SAF PLANETA RICA', 'PHARMASER', 3, 59, 3, 28, NULL, b'0'),
	(95, '200', '9.305258, -75.394525', 'CALLE 13 #16 - 08 BARRIO EL CARMEN', 'SAF PLATO', 'CONSORCIO', 3, 60, 4, 49, NULL, b'0'),
	(96, '10', '9.829778, -75.117608', 'CALLE 66 #5-70 LOCAL 102 B/ RECREO', 'SAF PLAZA RECREO', 'CONSORCIO', 1, 51, 3, 38, NULL, b'0'),
	(97, '15', '10.962190, -74.793117', 'CALLE 13 #9-42', 'SAF PUEBLO NUEVO', 'CONSORCIO', 3, 61, 3, 35, NULL, b'0'),
	(98, '10', '9.954106, -75.082532', 'CRA 2 #12A - 25 BARRIO 20 DE JULIO', 'SAF PUERTO ESCONDIDO', 'CONSORCIO', 2, 62, 3, 67, NULL, b'0'),
	(99, '30', '8.659837, -75.129979', 'CALLE 8 #9-22 LA CRUZ', 'SAF PUERTO LIBERTADOR', 'PHARMASER', 3, 63, 3, 28, NULL, b'0'),
	(100, '10', '10.489066, -74.797925', 'CRA 84 - 29 CENTRO', 'SAF PURISIMA', 'CONSORCIO', 3, 64, 3, 64, NULL, b'0'),
	(101, '70', '9.737720, -75.526514', 'LOTE #26 Mz C, PROYECTO VILLA REGIDOR', 'SAF REGIDOR', 'CONSORCIO', 3, 65, 2, 19, NULL, b'0'),
	(102, '10', '9.393747, -75.064341', 'CALLE 8 #9-39', 'SAF REPELON', 'CONSORCIO', 2, 66, 1, 45, NULL, b'0'),
	(103, '60', '8.95479, -75.839294', 'CALLE 2DA ANTIGUA CALLE DEL COMERCIO', 'SAF RIO VIEJO', 'CONSORCIO', 3, 67, 2, 58, NULL, b'0'),
	(104, '40', '9.239974, -74.350633', 'CRA 7 #14-60', 'SAF SABANAGRANDE', 'CONSORCIO', 3, 68, 1, 49, NULL, b'0'),
	(105, '10', '9.321596, -74.570662', 'CALLE 22 #16B-83', 'SAF SABANALARGA', 'CONSORCIO', 1, 69, 1, 46, NULL, b'0'),
	(106, '10', '9.237422, -75.813144', 'CALLE 16 #11-40 BARRIO EL CENTRO', 'SAF SAHAGUN', 'CONSORCIO', 1, 70, 3, 35, NULL, b'0'),
	(107, '10', '10.393228, -75.479849', 'CR 19 21-07, SAMPUES', 'SAF SAMPUES', 'CONSORCIO', 1, 72, 5, 35, NULL, b'0'),
	(108, '50', '10.930361, -74.818936', 'CALLE 12 #20-39 APTO 101', 'SAF SAN ANTERO', 'CONSORCIO', 3, 74, 3, 35, NULL, b'0'),
	(109, '20', '11.24094, -74.18507', 'CALLE 11 #8-32 BARRIO SAN FELIPE', 'SAF SAN BERNARDO DEL VIENTO', 'CONSORCIO', 2, 75, 3, 43, NULL, b'0'),
	(110, '10', '10.444310, -75.372152', 'CALLE 15 CRA 14 ESQUINA BARRIO SAN CARLOS', 'SAF SAN CARLOS', 'CONSORCIO', 3, 90, 5, 58, NULL, b'0'),
	(111, '4', '9.300243, -75.395138', 'LAS FLORES CALLE 17 #18-15 PISO 1', 'SAF SAN CAYETANO', 'CONSORCIO', 3, 79, 2, 26, NULL, b'0'),
	(112, '20', '7.957415, -73.945716', 'CRA 5ª #2077 a 1943', 'SAF SAN CRISTOBAL', 'CONSORCIO', 3, 76, 2, 64, NULL, b'0'),
	(113, '20', '9.244543, -75.146489', 'CRA 20 #17-34 PISO 1 LOCAL 2', 'SAF SAN FRANCISCO', 'CONSORCIO', 3, 90, 5, 10, NULL, b'0'),
	(114, '10', '10.91744, -74.76516', 'CRA 21 #46A - 95 APTO 101', 'SAF SAN JACINTO', 'CONSORCIO', 2, 77, 2, 25, NULL, b'0'),
	(115, '12', '10.389601, -75.137129', 'DIAGONAL 4 #6-11', 'SAF SAN JACINTO DEL CAUCA', 'PHARMASER', 2, 78, 2, 28, NULL, b'0'),
	(116, '25', '9.148139, -75.507185', 'CRA 12 #13-81, BARRIO ARRIBA ', 'SAF SAN JUAN', 'CONSORCIO', 2, 79, 2, 58, NULL, b'0'),
	(117, '20', '10.457325, -74.882104', 'BARRIO FRONTERA CALLE 10 #11-17', 'SAF SAN JUAN', 'CONSORCIO', 3, 79, 2, 58, NULL, b'0'),
	(118, '12', '9.300461, -74.565365', 'CRA 26 #18A-115 PISO 1 APT 1', 'SAF SAN MARCOS', 'CONSORCIO', 3, 80, 5, 64, NULL, b'0'),
	(119, '20', '8.557373, -74.263233', 'CRA 2 #4-43', 'SAF SAN MIGUEL', 'CONSORCIO', 3, 71, 4, 49, NULL, b'0'),
	(120, '20', '8.510049, -74.337799', 'CALLE 19 #18 - 35 CENTRO BARRIO LAS FLORES', 'SAF SAN ONOFRE', 'CONSORCIO', 3, 81, 5, 9, NULL, b'0'),
	(121, '10', '9.523725, -75.581682', 'CRA 9 CALLE 12-38 BARRIO CENTRO', 'SAF SAN PEDRO', 'CONSORCIO', 3, 82, 5, 16, NULL, b'0'),
	(122, '20', '9.452770, -75.439208', 'CALLE 4 # 6 - 54', 'SAF SAN PELAYO', 'CONSORCIO', 3, 83, 3, 43, NULL, b'0'),
	(123, '10', '9.186266, -75.551389', 'CRA 7 #7A-28 BARRIO LOMA FRESCA', 'SAF SAN SEBASTIAN', 'CONSORCIO', 6, 84, 2, 62, NULL, b'0'),
	(124, '100', '10.336747, -75.414658', 'CRA CON CALLE 4 CASA 172 BARRIO CENTRO', 'SAF SANTA ANA', 'CONSORCIO', 3, 85, 4, 50, NULL, b'0'),
	(125, '20', '10.274421, -75.443102', 'CALLE 17  #25A-39 BARRIO SAN PEDRO', 'SAF SANTA CRUZ (LORICA)', 'CONSORCIO', 2, 39, 3, 63, NULL, b'0'),
	(126, '10', '10,441303, -75,276697', 'DIAGONAL 31C 69A-85', 'SAF SANTA LUCIA ', 'CONSORCIO', 2, 16, 2, 58, NULL, b'0'),
	(127, '700', '9.748455, -74.815132', 'CRA 3 SUR #74-85', 'SAF SANTA MARIA', 'CONSORCIO', 3, 8, 1, 28, NULL, b'0'),
	(128, '10', '10.389334, -75.476140', 'AVENIDA LIBERTADOR #25-112 LOCAL 2', 'SAF SANTA MARTA', 'CONSORCIO', 3, 86, 4, 38, NULL, b'0'),
	(129, '20', '8.569431, -74.555038', 'CALLE DE LAS FLORES CRA 30 #16-155', 'SAF SANTA ROSA', 'CONSORCIO', 3, 87, 2, 64, NULL, b'0'),
	(130, '10', '10.400012, -75.157792', 'CALLE 24 CRA 18-31 P1 LOCAL 1 y 2', 'SAF SANTANDER', 'CONSORCIO', 5, 90, 5, 10, NULL, b'0'),
	(131, '10', '10.793798, -74.915385', 'CALLE 11 #8-03 BARRIO CALLE EL LIBERTADOR', 'SAF SIMITI', 'CONSORCIO', 3, 88, 2, 38, NULL, b'0'),
	(132, '30', '10.376338, -75.503529', 'CRA13 CON CALLE 9 #12-62 BARRIO GUINEA', 'SAF SINCÉ', 'CONSORCIO', 4, 89, 5, 64, NULL, b'0'),
	(133, '20', '9.320582, -74.972539', 'CALLE 18 #21-17', 'SAF SOLEDAD', 'CONSORCIO', 6, 91, 1, 58, NULL, b'0'),
	(134, '10', '9.149568, -75.628640', 'CALLE 2 #8-31, BARRIO CENTRO', 'SAF SOPLAVIENTO', 'CONSORCIO', 1, 92, 2, 64, NULL, b'0'),
	(135, '10', '9.11027, -75.39671', 'DIAGONAL 09-35 BARRIO LA BOMBA', 'SAF SOTAVENTO', 'CONSORCIO', 3, 73, 3, 35, NULL, b'0'),
	(136, 'ILIMITADO', '9.584595, -74.828109', 'CALLE 3 #14–46 BARRIO CENTRO', 'SAF SUAN', 'PHARMASER', 5, 93, 1, 40, NULL, b'0'),
	(137, '10', '9.719642, -75.128476', 'CALLE 14 #12-33 BARRIO BUENOS AIRES', 'SAF SULTANA', 'CONSORCIO', 6, 14, 1, 38, NULL, b'0'),
	(138, '20', '9.581248, -75.036877', 'DIAGONAL 6 #9A -150 FRENTE AL HOSPITAL', 'SAF TALAIGUA', 'CONSORCIO', 3, 94, 2, 50, NULL, b'0'),
	(139, '20', '10.405888, -75.506683', 'CALLE 5 CRA-9 Y 10 BARRIO EL PRADO', 'SAF TIERRA ALTA', 'PHARMASER', 3, 95, 3, 12, NULL, b'0'),
	(140, '10', '8.539391, -74.624508', 'CRA 1 #8-1 A 8-47 BARRIO LOMA FRESCA', 'SAF TIQUISIO', 'CONSORCIO', 3, 96, 2, 12, NULL, b'0'),
	(141, '30', '7.985183, -75.420529', 'CL 2 6-65 CASA', 'SAF TIQUISIO NUEVO', 'CONSORCIO', 3, 97, 2, 64, NULL, b'0'),
	(142, '20', '9.713172, -75.116950', 'CRA 5 #16-26 APT 1 BARRIO EL PROGRESO', 'SAF TOLU', 'CONSORCIO', 3, 98, 5, 35, NULL, b'0'),
	(143, '15', '10.462156, -74.619385', 'DIAGONAL 2  #4 - 43 CALLE TOLU', 'SAF TOLUVIEJO', 'CONSORCIO', 3, 99, 5, 64, NULL, b'0'),
	(144, '80', '8.411.356, -75.581408', 'CRA 13 # 11-20', 'SAF TUCHIN', 'CONSORCIO', 4, 100, 3, 10, NULL, b'0'),
	(145, '60', '7.891730, -75.670721', 'AVENIDA PASTRANA CRA 15 # 24-23 LOCAL 102', 'SAF TURBACO', 'CONSORCIO', 3, 101, 2, 58, NULL, b'0'),
	(146, '10', '8.249348, -74.720594', 'CALLE 18 #13-95 CALLE REAL DEL COCO', 'SAF TURBANA', 'CONSORCIO', 3, 102, 2, 56, NULL, b'0'),
	(147, '10', '10.334053, -74.878662', 'CALLE 14 # 17A - 264, BARRIO CALLE REAL', 'SAF VILLANUEVA', 'CONSORCIO', 2, 103, 2, 13, NULL, b'0'),
	(148, '6', '8.177308, -76.056761', 'RIO PUMAREJO CRA 17 #5A-45', 'SAF ZAMBRANO', 'CONSORCIO', 3, 104, 2, 58, NULL, b'0'),
	(149, NULL, NULL, NULL, 'SAF SAN JOSE', NULL, NULL, NULL, NULL, NULL, NULL, b'0'),
	(151, NULL, '223423.234234', 'TURBACODSF', 'SAF RAFAEL', 'PHARMASER', 1, 73, 3, 13, NULL, b'0'),
	(152, NULL, '223234-234', 'TURBACODSF', 'ASSSS', 'CONSORCIO', 3, 72, 5, 6, NULL, b'0'),
	(153, NULL, '223423.234234', 'TURBACODSF', 'SAF ACHI PRUEBA', 'PHARMASER', 3, 23, 3, 4, NULL, b'0'),
	(154, NULL, '10.389334, -75.476140', 'Cl. 31 #71B-105, La Concepción, Cartagena de Indias, Provincia de Cartagena, Bolívar', 'PRINCIPAL', 'PHARMASER', 2, 16, 2, 29, NULL, b'0'),
	(155, NULL, '223423.234234', 'TURBACODSF', 'RAFAEL TELECOMUNICACIONES', 'CONSORCIO', 3, 12, NULL, 39, NULL, b'0');

-- Volcando estructura para tabla bitacora_bd.funcionarios
CREATE TABLE IF NOT EXISTS `funcionarios` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `id_base_refrigeradora` bigint(20) DEFAULT NULL,
  `id_diademas` bigint(20) DEFAULT NULL,
  `farmcias` bigint(20) DEFAULT NULL,
  `id_hubusb` bigint(20) DEFAULT NULL,
  `id_monitores` bigint(20) DEFAULT NULL,
  `id_mouse` bigint(20) DEFAULT NULL,
  `id_portatiles` bigint(20) DEFAULT NULL,
  `id_teclado` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKljkpihjdhcpu9ein9uxj3qvs0` (`id_base_refrigeradora`),
  UNIQUE KEY `UKnbtvulq88919oe58tmyq0r67o` (`id_diademas`),
  UNIQUE KEY `UK2c5ol4tbh9hssafe0bimpjdml` (`id_hubusb`),
  UNIQUE KEY `UKf46221x1tr2fxxcnx0kq47dps` (`id_monitores`),
  UNIQUE KEY `UKfa3w9l91jvnx4e98lknkinm1` (`id_mouse`),
  UNIQUE KEY `UKpws37d60ouyhon9d83fig2uy1` (`id_portatiles`),
  UNIQUE KEY `UKt903mgji5xvel0j5qc345ywor` (`id_teclado`),
  KEY `FKbje3mwqsavjiac3jd7oaemnnc` (`farmcias`),
  CONSTRAINT `FK12c069mocrs88diob2n98sff0` FOREIGN KEY (`id_base_refrigeradora`) REFERENCES `base_refrigeradora` (`id`),
  CONSTRAINT `FKbje3mwqsavjiac3jd7oaemnnc` FOREIGN KEY (`farmcias`) REFERENCES `farmacias` (`id`),
  CONSTRAINT `FKebe5maf8dwie1jodycx0r66dc` FOREIGN KEY (`id_hubusb`) REFERENCES `hub_usb` (`id`),
  CONSTRAINT `FKepw4nsg42sxjw1ut47jrq9cr8` FOREIGN KEY (`id_diademas`) REFERENCES `diademas` (`id`),
  CONSTRAINT `FKgia1v8o3ilxq8cwurox6e1a4d` FOREIGN KEY (`id_monitores`) REFERENCES `monitores` (`id`),
  CONSTRAINT `FKj141sbhqbtfhxlfhsdgy3cf83` FOREIGN KEY (`id_portatiles`) REFERENCES `portatiles` (`id`),
  CONSTRAINT `FKn9hxgce82oaoxky7t7uxrt8dh` FOREIGN KEY (`id_teclado`) REFERENCES `teclados` (`id`),
  CONSTRAINT `FKnqmli0gq7pldynwjhv3ikkj4y` FOREIGN KEY (`id_mouse`) REFERENCES `mouses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.funcionarios: ~1 rows (aproximadamente)
INSERT INTO `funcionarios` (`id`, `correo`, `apellido`, `area`, `nombre`, `id_base_refrigeradora`, `id_diademas`, `farmcias`, `id_hubusb`, `id_monitores`, `id_mouse`, `id_portatiles`, `id_teclado`) VALUES
	(1, 'auxsoportetic@pharmaser.com.co', 'Rojas', 'Tecnologia', 'Rafael', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- Volcando estructura para tabla bitacora_bd.hub_usb
CREATE TABLE IF NOT EXISTS `hub_usb` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_compra` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.hub_usb: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.modems
CREATE TABLE IF NOT EXISTS `modems` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `numero_serie` varchar(255) DEFAULT NULL,
  `ubicacion_modems` bigint(20) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `operador` bigint(20) DEFAULT NULL,
  `numero` decimal(38,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4nthaqkvq44yr98wsd714tbkp` (`ubicacion_modems`),
  KEY `FK46dlu810ens4iu40nkryly5j9` (`operador`),
  CONSTRAINT `FK46dlu810ens4iu40nkryly5j9` FOREIGN KEY (`operador`) REFERENCES `proveedor_internet` (`id`),
  CONSTRAINT `FK4nthaqkvq44yr98wsd714tbkp` FOREIGN KEY (`ubicacion_modems`) REFERENCES `farmacias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.modems: ~15 rows (aproximadamente)
INSERT INTO `modems` (`id`, `estado`, `marca`, `modelo`, `numero_serie`, `ubicacion_modems`, `is_deleted`, `operador`, `numero`) VALUES
	(1, 'EN USO', 'ZTE', 'MF286C', 'S/N: 867551040267704', 154, b'0', 58, 3103440510),
	(2, 'EN USO', 'ZTE', 'MF286C', 'NO IDENTIFICADO', 154, b'0', 58, 0),
	(3, 'EN USO', 'ZTE', 'MF286C', 'S/N: 867551040326674', 154, b'0', 58, 3103440431),
	(4, 'EN USO', '', 'WG1602', 'S/N: 2022030020', 154, b'0', 58, 3228817921),
	(5, 'EN USO', 'ZTE', 'MF286C', 'S/N: 867551040267258', 154, b'0', 58, 3228817901),
	(6, 'EN USO', 'ZTE', 'MF286C', 'S/N: 867551040324281', 154, b'0', 58, 3188763095),
	(7, 'EN USO', 'ZTE', 'MF286C', 'S/N: 867551040262713', 154, b'0', 58, 3138763095),
	(8, 'EN USO', 'ZTE', 'MF286C', 'S/N: 867551040263752', 154, b'0', 58, 3128215856),
	(9, 'EN USO', 'HUAWEI', 'B311-522', '4PG7S20424001372', 154, b'0', 38, 0),
	(10, 'EN USO', 'ZTE', 'MF286C', 'S/N: 867551040262705', 154, b'0', 38, 3163732164),
	(11, 'EN USO', 'SOYEALINK', 'B311-522', 'S/N: 866315050674550', 154, b'0', 38, 3003690005),
	(12, 'EN USO', 'ZTE', 'MF286C', 'NO IDENTIFICADO', 154, b'0', 38, 3186323245),
	(13, 'EN USO', 'ZTE', 'MF286C', 'NO IDENTIFICADO', 154, b'0', 38, 3185306277),
	(14, 'EN USO', 'ZTE', 'MF286C', 'NO IDENTIFICADO', 154, b'0', 68, 3028519884),
	(15, 'EN USO', 'H30', '2AR45-CPE', 'S/N: R051634030511535', 154, b'0', 68, 3028509918);

-- Volcando estructura para tabla bitacora_bd.monitores
CREATE TABLE IF NOT EXISTS `monitores` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_compra` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.monitores: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.motivo_reporte
CREATE TABLE IF NOT EXISTS `motivo_reporte` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `motivo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.motivo_reporte: ~11 rows (aproximadamente)
INSERT INTO `motivo_reporte` (`id`, `motivo`) VALUES
	(1, 'BLOQUEO MODEM'),
	(2, 'CORTE FIBRA'),
	(3, 'DAÑO MODEM'),
	(4, 'FALLA MASIVA'),
	(5, 'FALTA DE PAGO'),
	(6, 'SIN SERVICIO'),
	(7, 'INTERMITENCIA'),
	(8, 'FALLA MASIVA'),
	(9, 'SATURACIÓN DEL SERVICIO'),
	(10, 'PROVEEDOR CANCELO EL SERVICIO'),
	(11, 'SIN ENERGIA');

-- Volcando estructura para tabla bitacora_bd.mouses
CREATE TABLE IF NOT EXISTS `mouses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_compra` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.mouses: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.portatiles
CREATE TABLE IF NOT EXISTS `portatiles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_compra` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.portatiles: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.proveedor_envio
CREATE TABLE IF NOT EXISTS `proveedor_envio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `nombre_proveedor` varchar(255) DEFAULT NULL,
  `numero_contacto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.proveedor_envio: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.proveedor_internet
CREATE TABLE IF NOT EXISTS `proveedor_internet` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) DEFAULT NULL,
  `estado` varchar(255) NOT NULL DEFAULT 'EN SERVICIO',
  `nit` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `nombre_contacto` varchar(255) DEFAULT NULL,
  `numero_contacto` int(11) DEFAULT NULL,
  `fecha_contratacion` datetime(6) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.proveedor_internet: ~79 rows (aproximadamente)
INSERT INTO `proveedor_internet` (`id`, `correo`, `estado`, `nit`, `nombre`, `nombre_contacto`, `numero_contacto`, `fecha_contratacion`, `observacion`, `is_deleted`) VALUES
	(1, 'vivemasinternet@gmail.com', 'EN SERVICIO', 901339823, 'VIVE+INTERNET SAS', 'INTERNET TOLU VIEJO', 302, NULL, NULL, b'0'),
	(2, 'comercialplato@dialnet.net.co', 'EN SERVICIO', 819003851, 'DIALNET', 'ATENCION AL USUARIO', 310, NULL, 'PRUEBAAAAAAA', b'0'),
	(3, 'robincastellar@gmail.com', 'NO ACTIVO', 901363617, 'SOSNET', 'CASTELLAR GOMEZ ROBINSON', 2147483647, NULL, NULL, b'0'),
	(4, 'contacto@megacom.net.co  ', 'EN SERVICIO', 900869254, 'MEGA', 'INTERNET LA UNION', 320, NULL, NULL, b'0'),
	(5, 'contabilidad@inttercom.net.co', 'NO ACTIVO', 900882990, 'INTTERCOM S.A.S', 'INTTERCOM S.A.S', 2147483647, NULL, NULL, b'0'),
	(6, 'auxiliaradministrativo@redenlaces.net', 'EN SERVICIO', 900923095, 'REDES Y ENLACES', 'REDES Y ENLACES SOPORTE', 2147483647, NULL, NULL, b'0'),
	(7, 'agencia.cerete@cabletelco.co', 'NO ACTIVO', 900552398, 'CABLETELCO', 'OMAIRA', 321, NULL, NULL, b'0'),
	(8, 'oscaragudelo_05@hotmail.com', 'EN SERVICIO', 900969984, 'TURBOREDES TELECOMUNICACIONES SAS', 'OSCAR AGUDELO ', 2147483647, NULL, NULL, b'0'),
	(9, 'pedrotg0001968@gmail.com', 'EN SERVICIO', 900741424, 'TV PLUS SAN ONOFRE', 'PEDRO', 311, NULL, NULL, b'0'),
	(10, 'Info@telematik.co', 'EN SERVICIO', 900653118, 'TELEMATIKA', 'TELEMATICA TUCHIN', 300, NULL, NULL, b'0'),
	(11, 'networkdatalink_12@outlook.com', 'EN SERVICIO', 900965433, 'NETWORK DATALINK SAS', 'YULE', 2147483647, NULL, NULL, b'0'),
	(12, 'ancsoluciones2018@hotmail.com', 'EN SERVICIO', 901186290, 'ANC SOLUCIONES', 'ANC SOLUCIONES', 313, NULL, NULL, b'0'),
	(13, 'infofullred.net', 'EN SERVICIO', 901328096, 'FULLRED COLOMBIA', 'BREINER LOPEZ', 304, NULL, NULL, b'0'),
	(14, 'asistenciabalcom@hotmail.com', 'NO ACTIVO', 900737564, 'SENERGITEL', 'BREITNER PINO', 300, NULL, NULL, b'0'),
	(15, 'info@caribetech.net.co', 'EN SERVICIO', 900972509, 'CARIBETECH', 'CARIBETECH INTERNET', 321894444, NULL, 'Proveedor.', b'0'),
	(16, 'ispmeganettel@gmail.com', 'EN SERVICIO', 901254435, 'KAIROS.NET (MEGANET)', 'DANIEL CASTRO', 320, NULL, NULL, b'0'),
	(17, 'Wired.comunicaciones.sas@gmail.com', 'NO ACTIVO', 901033663, 'WIRED', 'Derlis Wired Sj Cauc', 313, NULL, NULL, b'0'),
	(18, 'diana.berrocal@sinured.co, info@sinured.co', 'EN SERVICIO', 901048373, 'SINURED', 'DIANA BERROCAL', 2147483647, NULL, NULL, b'0'),
	(19, 'dscintertnet@gmail.com', 'EN SERVICIO', 901412119, 'DSC TELECOMUNICACIONES', 'DSC TELECOMUNICACIONES', 2147483647, NULL, NULL, b'0'),
	(20, 'evergara9@hotmail.com', 'EN SERVICIO', 901199157, 'REDINGECOR', 'EDWIN INTE PURISIMA', 300, NULL, NULL, b'0'),
	(21, 'nn', 'NO ACTIVO', 900729788, 'FJC TELECOMUNICACIONES', 'FJC TELECOMUNICACIONES', 310, NULL, NULL, b'0'),
	(22, 'fundecal2018@gmail.com', 'NO ACTIVO', 900554475, 'FUNDECAL', 'FUNDECAL ACHI', 304, NULL, NULL, b'0'),
	(23, 'joseporto1982@hotmail.com', 'NO ACTIVO', 30872069, 'FLASHTEL COMUNICACIONES', 'HERRERA GUTIERREZ KAOLY ', 2147483647, NULL, NULL, b'0'),
	(24, 'Hilario.Hernandez@redingecor.Com', 'EN SERVICIO', 901199157, 'REDINGECOR MOÑITOS', 'HILARIO HERNANDEZ', 300, NULL, NULL, b'0'),
	(25, 'rodolfoortegacab@yahoo.es', 'EN SERVICIO', 901141093, 'SISTEMA DE MEDIOS DE COMUNICACIONES Y TECNOLOGIA S.A.S', 'INTERNET SAN JACIENTO', 310, NULL, NULL, b'0'),
	(26, 'dbsolutionsystem@gmail.com', 'EN SERVICIO', 901443777, 'DB SOLUTION SYSTEM', 'INTERNET SANCAYETANO', 320, NULL, NULL, b'0'),
	(27, 'ivanemendez@hotmail.com', 'EN SERVICIO', 79993832, 'IVAN ENRIQUE MENDEZ PEREZ', 'IVAN ENRIQUE MENDEZ PEREZ', 2147483647, NULL, NULL, b'0'),
	(28, 'Lissette.Manga@libertynet.com', 'EN SERVICIO', 2147483647, 'LIBERTY NETWORKS', 'LISSETTE MANGA', 2147483647, NULL, NULL, b'0'),
	(29, 'cydcomunicacionessas@gmail.com', 'EN SERVICIO', 900870935, 'CYD COMUNICACIONES', 'KATHERINE GUITERREZ', 2147483647, NULL, NULL, b'0'),
	(30, 'elipsewn@gmail.com', 'EN SERVICIO', 901220547, 'ELIPSE', 'LINEY', 2147483647, NULL, NULL, b'0'),
	(31, 'facturacion.reintelco@jmcomunicar.com', 'EN SERVICIO', 901176933, 'REINTELCO S.A.S', 'MARIA PATRICIA', 2147483647, NULL, NULL, b'0'),
	(32, 'servicioalcliente@cfingenieros.com.co', 'EN SERVICIO', 900650911, 'FLOR EUGENIA MEDINA', 'MEDINA BERMUDEZ FLOR EUGENIA', 2147483647, NULL, NULL, b'0'),
	(33, 'backcorporativo@azteca-comunicaciones.com', 'EN SERVICIO', 900548102, 'AZTECA', 'SOPORTE TIGO-UNE', 2147483647, NULL, NULL, b'0'),
	(34, 'servicioalcliente@directvla.com.co', 'NO ACTIVO', 805006014, 'DIRECTV', 'NN', 2147483647, NULL, NULL, b'0'),
	(35, 'hsolenl@experiencia.emtelco.com.co', 'EN SERVICIO', 830114921, 'TIGO-UNE', 'HERNANDO SOLENO', 2147483647, NULL, NULL, b'0'),
	(36, 'leongt84@hotmail.com', 'EN SERVICIO', 901288389, 'MUGORED SAS', 'RODELO ROJAS SOLEDIS', 2147483647, NULL, NULL, b'0'),
	(37, 'Hya_telecomunicacionessas36@yahoo.es', 'NO ACTIVO', 901237627, 'H&A TELECOMUNICACIONES', 'RODRIG INTER ARENAL', 318, NULL, NULL, b'0'),
	(38, 'rosa.gaona.telefonica@fractalia.es', 'EN SERVICIO', 830122566, 'Colombia Telecomunicaciones S.A. ESP', 'ROSA GAONA', 2147483647, NULL, NULL, b'0'),
	(39, 'nn', 'NO ACTIVO', 92131472, 'RJ45 TELECOMUNICACIONES', 'SALVADOR RJ45 TELECOMUNICACIONES', 321, NULL, NULL, b'0'),
	(40, 'tvinterrcomunicaciones@gmail.com', 'EN SERVICIO', 901176704, 'TV INTERR COMUNICACIONES', 'TV INTERR COMUNICACIONES', 300, NULL, NULL, b'0'),
	(41, 'telecomunicacionestelesam@gmail.com', 'EN SERVICIO', 901471866, 'TV MOJANA / TELESAM', 'TV MOJANA - TELESAM', 312, NULL, NULL, b'0'),
	(42, 'Marialabajatv.net01@gmail.com', 'NO ACTIVO', 0, 'MARIA LA BAJA TV NET', 'Marialabajatv.net01@gmail.com', 300, NULL, NULL, b'0'),
	(43, 'ing.kevis@gmail.com', 'EN SERVICIO', 901389138, 'SIR TELECOMUNICACIONES', 'SIR TELECOMUNICACIONES SAS', 304, NULL, NULL, b'0'),
	(44, 'SURNETSTELECOMUNICACIONES@GMAIL.COM', 'EN SERVICIO', 901576746, 'SURNETS TELECOMUNICACIONES S.A.S', 'ARNOL PEREZ', 0, NULL, NULL, b'0'),
	(45, 'atlantelsas@gmail.com', 'EN SERVICIO', 901545701, 'ATLANTEL SAS', 'ANTONIO', 2147483647, NULL, NULL, b'0'),
	(46, 'servicioalcliente@megatelcolombia.com', 'EN SERVICIO', 901361674, 'MEGATEL', 'ALBERTO', 321, NULL, NULL, b'0'),
	(47, 'Calixto.romero@segitel.com.co', 'EN SERVICIO', 2147483647, 'SEGITEL', 'ANGELICA AVILA', 316, NULL, NULL, b'0'),
	(48, 'nn', 'NO ACTIVO', 0, 'BALA', 'BALAS SAS', 321, NULL, NULL, b'0'),
	(49, 'comercialsalamina@dialnet.net.co', 'EN SERVICIO', 819003851, 'DIALNET', 'CERETH BARRIOS POLO', 2147483647, NULL, NULL, b'0'),
	(50, 'jkpuntocom@hotmail.com', 'EN SERVICIO', 1052040175, 'JK COMUNICACIONES', 'COLON MONROY YENIS', 2147483647, NULL, NULL, b'0'),
	(51, 'gerencia@conectel.net.co', 'NO ACTIVO', 901281727, 'CONECTEL', 'CONECTEL SAN JUAN NEPOMUCENO', 300, NULL, NULL, b'0'),
	(52, 'fibraredsas@gmail.com', 'EN SERVICIO', 901584978, 'FIBRARED', 'CORINA UMBARILLA', 2147483647, NULL, NULL, b'0'),
	(53, 'Jovany@d-network.com.co', 'EN SERVICIO', 901395453, 'D-NETWORK', 'D-NETWORK', 350, NULL, NULL, b'0'),
	(54, 'ispservired@gmail.com', 'EN SERVICIO', 900964521, 'SERVIREDES TELECOMUNICACIONES', 'ENDER', 310, NULL, NULL, b'0'),
	(55, 'nn', 'NO ACTIVO', 901424257, 'WINET', 'Enio Mogollon-chima', 312, NULL, NULL, b'0'),
	(56, 'urbalinktel2020@gmail.com', 'EN SERVICIO', 2147483647, 'URBALINK TELECOMUNICACIONES', 'ERNESTO ESCUDEROS', 319, NULL, NULL, b'0'),
	(57, 'jesusfernando_26@hotmail.com', 'NO ACTIVO', 901025707, 'GIGACOM TELECOMUNICACIONES SAS', 'GIGACOM TELECOMUNICACIONES SAS', 2147483647, NULL, NULL, b'0'),
	(58, 'jhony.perez@claro.com.co', 'EN SERVICIO', 800153993, 'CLARO', 'JHONY PEREZ', 2147483647, NULL, NULL, b'0'),
	(59, 'jbrand@clickhd.co', 'EN SERVICIO', 805017162, 'CLICKHD', 'Jirloth del mar Brand Rivera', 2147483647, NULL, NULL, b'0'),
	(60, 'conexcionisosaslorica@gmail.com', 'EN SERVICIO', 901308408, 'INVERSIONES REDES S.A.S', 'RICARDO DIAZ', 2147483647, NULL, NULL, b'0'),
	(61, 'caribtel900@gmail.com', 'EN SERVICIO', 900570454, 'CARIBTEL SAS', 'KATHERINE LOZANO', 2147483647, NULL, NULL, b'0'),
	(62, 'facturacioncablenet@gmail.com', 'EN SERVICIO', 901106944, 'CABLENET TELECOMUNICACIONES', 'LINEY ESTHER LOPEZ RODRIGUEZ', 2147483647, NULL, NULL, b'0'),
	(63, 'JUANK971007@GMAIL.COM', 'EN SERVICIO', 901611923, 'INTER LANET TELECOMUNICACIONES SAS', ' JUAN CARLOS CAMACHO', 321, NULL, NULL, b'0'),
	(64, 'clientes.colibri@gmail.com', 'EN SERVICIO', 900220418, 'ELIPS', 'EDUIN LUNA PINEDA', 2147483647, NULL, NULL, b'0'),
	(65, 'pentanet005@gmail.com', 'EN SERVICIO', 901499970, 'PENTANET', 'ENRIQUE MARQUEZ', 2147483647, NULL, NULL, b'0'),
	(66, 'nn', 'EN SERVICIO', 901457268, 'EUROPLAN', 'SANDRA CORTES', 2147483647, NULL, NULL, b'0'),
	(67, 'jdmiranda1997@gmail.com', 'EN SERVICIO', 901547811, 'PUERTONET', 'JONATHAN MIRANDA', 2147483647, NULL, NULL, b'0'),
	(68, 'nn', 'EN SERVICIO', 901354361, 'WOM', 'WOM SOPORTE', 1, NULL, NULL, b'0'),
	(70, 'd@dd', 'NO ACTIVO', 6, 'ddd', NULL, NULL, NULL, NULL, b'1'),
	(71, 'rafael312020@outlook.es', 'NO ACTIVO', 1050946620, 'RAFAEL TELECOMUNICACIONES', NULL, NULL, NULL, NULL, b'1'),
	(72, 'rafael312020@outlook.es', 'EN SERVICIO', 14, 'ASSSS', NULL, NULL, NULL, 'jhhhhh', b'1'),
	(73, 'rafael312020@outlook.es', 'EN SERVICIO', 129, 'ddd', NULL, NULL, NULL, 'GGG', b'1'),
	(74, 'rafael312020@outlook.es', 'ACTIVO', 5554656, 'RAFAEL TELECOMUNICACIONES', 'fffff', 546, NULL, '4564645', b'1'),
	(75, 'rafael312020@outlook.es', 'ACTIVO', 453453, 'RAFAEL TELECOMUNICACIONES', 'GHJGHJGHJGHJ', 5467868, '2024-11-19 19:00:00.000000', 'dfsfs', b'1'),
	(76, 'd@dd', 'NO ACTIVO', 4534534, 'fsdfsdf', '453', 5467868, '2024-11-20 19:00:00.000000', 'fddsf', b'1'),
	(77, 'd@dd', 'NO ACTIVO', 65156, 'ASSSS', 'fffff', 5467868, '2024-11-27 19:00:00.000000', NULL, b'1'),
	(78, 'rafael312020@outlook.es', 'NO ACTIVO', 123456789, 'RAFAEL TELECOMUNICACIONES', 'Rafaeeeee', 311669424, '2024-11-20 19:00:00.000000', 'FDSFDSAFDSAFDSA', b'1'),
	(79, 'asdasda@sfdsdf', 'EN SERVICIO', 72255, 'ddd', 'Rafaeeeee', 5467868, '2024-11-08 19:00:00.000000', 'sdfsdfsdfsdfsdf', b'1'),
	(80, 'asdasda@sfdsdf', 'EN SERVICIO', 412563, 'asdasd', 'PRDFSDF', 1234586, '2024-11-29 19:00:00.000000', 'ESTE PROVEEDOR ES DE PRUEBA ', b'1');

-- Volcando estructura para tabla bitacora_bd.regente
CREATE TABLE IF NOT EXISTS `regente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `id_farmacia` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa2b8cxlksi6p2k8x5mgajga91` (`id_farmacia`),
  CONSTRAINT `FKa2b8cxlksi6p2k8x5mgajga91` FOREIGN KEY (`id_farmacia`) REFERENCES `farmacias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.regente: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.reporte
CREATE TABLE IF NOT EXISTS `reporte` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ano` int(11) DEFAULT NULL,
  `duracion_incidente` time(6) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `fecha_hora_fin` datetime(6) DEFAULT NULL,
  `fecha_hora_inicio` datetime(6) DEFAULT NULL,
  `mes` int(11) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `radicado` varchar(255) DEFAULT NULL,
  `id_farmacia` bigint(20) DEFAULT NULL,
  `id_motivo` bigint(20) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr5yvs07xwa2tkmqaky8k6qico` (`id_farmacia`),
  KEY `FK5st3a6i0w277a5agykonkq0po` (`id_motivo`),
  CONSTRAINT `FK5st3a6i0w277a5agykonkq0po` FOREIGN KEY (`id_motivo`) REFERENCES `motivo_reporte` (`id`),
  CONSTRAINT `FKr5yvs07xwa2tkmqaky8k6qico` FOREIGN KEY (`id_farmacia`) REFERENCES `farmacias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.reporte: ~261 rows (aproximadamente)
INSERT INTO `reporte` (`id`, `ano`, `duracion_incidente`, `estado`, `fecha`, `fecha_hora_fin`, `fecha_hora_inicio`, `mes`, `observacion`, `radicado`, `id_farmacia`, `id_motivo`, `is_deleted`) VALUES
	(1, 2023, '03:00:00.000000', 'CERRADO', '2023-06-06', '2023-06-06 14:26:00.000000', '2023-06-06 11:26:00.000000', 6, 'n/a', '1', 59, 5, b'0'),
	(2, 2023, '04:00:00.000000', 'CERRADO', '2023-06-23', '2023-06-23 16:26:00.000000', '2023-06-23 12:26:00.000000', 6, 'n/a', '1', 148, 5, b'0'),
	(4, 2023, '01:59:00.000000', 'CERRADO', '2023-08-05', '2023-08-05 17:00:00.000000', '2023-08-05 15:01:00.000000', 8, 'n/a', '1', 59, 7, b'0'),
	(5, 2023, '01:44:00.000000', 'CERRADO', '2023-08-08', '2023-08-08 09:55:00.000000', '2023-08-08 08:11:00.000000', 8, 'n/a', '1', 148, 6, b'0'),
	(6, 2023, '01:07:00.000000', 'CERRADO', '2023-08-08', '2023-08-08 16:32:00.000000', '2023-08-08 15:25:00.000000', 8, 'n/a', '1', 80, 6, b'0'),
	(7, 2023, '08:55:27.000000', 'CERRADO', '2023-08-09', '2023-08-09 16:30:00.000000', '2023-08-09 07:34:00.000000', 8, 'n/a', '1', 115, 6, b'0'),
	(8, 2023, '05:04:52.000000', 'CERRADO', '2023-08-09', '2023-08-09 19:59:00.000000', '2023-08-09 14:54:00.000000', 8, 'n/a', '1', 115, 6, b'0'),
	(9, 2023, '00:28:18.000000', 'CERRADO', '2023-08-09', '2023-08-09 16:14:00.000000', '2023-08-09 15:46:00.000000', 8, 'n/a', '1', 115, 6, b'0'),
	(10, 2023, '04:00:00.000000', 'CERRADO', '2023-08-10', '2023-08-10 16:15:00.000000', '2023-08-10 12:15:00.000000', 8, 'n/a', '1', 15, 7, b'0'),
	(11, 2023, '04:00:00.000000', 'CERRADO', '2023-08-10', '2023-08-10 16:15:00.000000', '2023-08-10 12:15:00.000000', 8, 'n/a', '1', 145, 7, b'0'),
	(12, 2023, '04:49:05.000000', 'CERRADO', '2023-08-10', '2023-08-10 17:04:00.000000', '2023-08-10 12:15:00.000000', 8, 'n/a', '1', 15, 7, b'0'),
	(13, 2023, '22:12:00.000000', 'CERRADO', '2023-08-10', '2023-08-10 09:00:00.000000', '2023-08-08 10:48:00.000000', 8, 'n/a', '1', 99, 6, b'0'),
	(14, 2023, '02:16:00.000000', 'CERRADO', '2023-08-10', '2023-08-10 10:00:00.000000', '2023-08-10 07:44:00.000000', 8, 'n/a', '1', 34, 6, b'0'),
	(15, 2023, '01:45:00.000000', 'CERRADO', '2023-08-10', '2023-08-10 09:12:00.000000', '2023-08-10 07:27:00.000000', 8, 'n/a', '1', 74, 6, b'0'),
	(16, 2023, '18:00:00.000000', 'CERRADO', '2023-08-13', '2023-08-14 08:00:00.000000', '2023-08-13 14:00:00.000000', 8, 'n/a', '1', 67, 6, b'0'),
	(17, 2023, '00:50:00.000000', 'CERRADO', '2023-08-14', '2023-08-14 09:00:00.000000', '2023-08-14 08:10:00.000000', 8, 'n/a', '1', 116, 6, b'0'),
	(18, 2023, '00:47:00.000000', 'CERRADO', '2023-08-14', '2023-08-09 16:53:00.000000', '2023-08-09 16:06:00.000000', 8, 'n/a', '1', 143, 5, b'0'),
	(19, 2023, '09:12:00.000000', 'CERRADO', '2023-08-14', '2023-08-16 00:00:00.000000', '2023-08-14 14:48:00.000000', 8, 'n/a', '1', 139, 6, b'0'),
	(20, 2023, '07:00:00.000000', 'CERRADO', '2023-08-14', '2023-08-14 14:00:00.000000', '2023-08-14 07:00:00.000000', 8, 'n/a', '1', 64, 6, b'0'),
	(21, 2023, '01:35:00.000000', 'CERRADO', '2023-08-14', '2023-08-14 09:51:00.000000', '2023-08-14 08:16:00.000000', 8, 'n/a', '1', 52, 6, b'0'),
	(22, 2023, '07:00:00.000000', 'CERRADO', '2023-08-15', '2023-08-15 17:00:00.000000', '2023-08-15 10:00:00.000000', 8, 'n/a', '1', 58, 6, b'0'),
	(23, 2023, '20:35:35.000000', 'CERRADO', '2023-08-15', '2023-08-16 09:40:00.000000', '2023-08-15 13:05:00.000000', 8, 'n/a', '1', 44, 6, b'0'),
	(24, 2023, '00:47:00.000000', 'CERRADO', '2023-08-15', '2023-08-09 16:53:00.000000', '2023-08-09 16:06:00.000000', 8, 'n/a', '1', 99, 5, b'0'),
	(25, 2023, '01:00:00.000000', 'CERRADO', '2023-08-15', '2023-08-15 17:00:00.000000', '2023-08-15 16:00:00.000000', 8, 'n/a', '1', 15, 6, b'0'),
	(26, 2023, '04:30:00.000000', 'CERRADO', '2023-08-16', '2023-08-16 13:00:00.000000', '2023-08-16 08:30:00.000000', 8, 'n/a', '1', 146, 6, b'0'),
	(27, 2023, '00:51:00.000000', 'CERRADO', '2023-08-16', '2023-08-16 09:00:00.000000', '2023-08-16 08:09:00.000000', 8, 'n/a', '1', 60, 6, b'0'),
	(28, 2023, '00:15:31.000000', 'CERRADO', '2023-08-17', '2023-08-17 10:40:00.000000', '2023-08-17 10:24:00.000000', 8, 'n/a', '1', 112, 6, b'0'),
	(29, 2023, '06:12:00.000000', 'CERRADO', '2023-08-17', '2023-08-17 13:00:00.000000', '2023-08-17 06:48:00.000000', 8, 'n/a', '1', 50, 6, b'0'),
	(30, 2023, '04:18:00.000000', 'CERRADO', '2023-08-18', '2023-08-18 13:00:00.000000', '2023-08-18 08:42:00.000000', 8, 'n/a', '1', 70, 6, b'0'),
	(31, 2023, '01:25:00.000000', 'CERRADO', '2023-08-22', '2023-08-23 09:57:00.000000', '2023-08-22 08:32:00.000000', 8, 'n/a', '1', 26, 6, b'0'),
	(32, 2023, '22:39:00.000000', 'CERRADO', '2023-08-22', '2023-08-23 08:29:00.000000', '2023-08-22 09:50:00.000000', 8, 'n/a', '1', 60, 6, b'0'),
	(33, 2023, '05:08:00.000000', 'CERRADO', '2023-08-22', '2023-08-22 12:30:00.000000', '2023-08-22 07:22:00.000000', 8, 'n/a', '1', 112, 6, b'0'),
	(34, 2023, '03:35:00.000000', 'CERRADO', '2023-08-23', '2023-08-23 10:35:00.000000', '2023-08-23 07:00:00.000000', 8, 'n/a', '1', 12, 6, b'0'),
	(35, 2023, '17:55:00.000000', 'CERRADO', '2023-08-23', '2023-08-31 09:30:00.000000', '2023-08-23 15:35:00.000000', 8, 'n/a', '1', 82, 6, b'0'),
	(36, 2023, '04:16:00.000000', 'CERRADO', '2023-08-23', '2023-08-24 12:00:00.000000', '2023-08-23 07:44:00.000000', 8, 'n/a', '1', 136, 6, b'0'),
	(37, 2023, '01:56:00.000000', 'CERRADO', '2023-08-23', '2023-08-23 11:45:00.000000', '2023-08-23 09:49:00.000000', 8, 'n/a', '1', 60, 6, b'0'),
	(38, 2023, '02:08:00.000000', 'CERRADO', '2023-08-23', '2023-08-23 10:35:00.000000', '2023-08-23 08:27:00.000000', 8, 'n/a', '1', 60, 6, b'0'),
	(39, 2023, '03:00:00.000000', 'CERRADO', '2023-08-23', '2023-08-23 10:20:00.000000', '2023-08-23 07:20:00.000000', 8, 'n/a', '1', 27, 6, b'0'),
	(40, 2023, '00:56:12.000000', 'CERRADO', '2023-08-24', '2023-08-24 11:38:00.000000', '2023-08-24 10:41:00.000000', 8, 'n/a', '1', 26, 6, b'0'),
	(41, 2023, '05:30:00.000000', 'CERRADO', '2023-08-24', '2023-08-24 13:30:00.000000', '2023-08-24 08:00:00.000000', 8, 'n/a', '1', 58, 6, b'0'),
	(42, 2023, '02:00:00.000000', 'CERRADO', '2023-08-28', '2023-08-28 14:00:00.000000', '2023-08-28 12:00:00.000000', 8, 'n/a', '1', 61, 6, b'0'),
	(43, 2023, '04:02:00.000000', 'CERRADO', '2023-08-29', '2023-08-29 15:34:00.000000', '2023-08-29 11:32:00.000000', 8, 'n/a', '1', 50, 6, b'0'),
	(44, 2023, '06:50:00.000000', 'CERRADO', '2023-08-29', '2023-08-29 13:30:00.000000', '2023-08-29 06:40:00.000000', 8, 'n/a', '1', 52, 6, b'0'),
	(45, 2023, '04:45:00.000000', 'CERRADO', '2023-08-29', '2023-08-29 12:15:00.000000', '2023-08-29 07:30:00.000000', 8, 'n/a', '1', 105, 6, b'0'),
	(46, 2023, '20:26:57.000000', 'CERRADO', '2023-08-30', '2023-08-31 07:00:00.000000', '2023-08-30 10:33:00.000000', 8, 'n/a', '1', 12, 6, b'0'),
	(47, 2023, '00:14:00.000000', 'CERRADO', '2023-08-30', '2023-08-11 07:30:00.000000', '2023-08-10 07:16:00.000000', 8, 'n/a', '1', 50, 6, b'0'),
	(48, 2023, '04:00:00.000000', 'CERRADO', '2023-08-31', '2023-08-31 11:10:00.000000', '2023-08-31 07:10:00.000000', 8, 'n/a', '1', 115, 6, b'0'),
	(49, 2023, '03:52:00.000000', 'CERRADO', '2023-09-04', '2023-09-04 11:00:00.000000', '2023-09-04 07:08:00.000000', 9, 'n/a', '1', 82, 6, b'0'),
	(50, 2023, '02:50:00.000000', 'CERRADO', '2023-09-04', '2023-09-04 10:20:00.000000', '2023-09-04 07:30:00.000000', 9, 'n/a', '1', 85, 6, b'0'),
	(51, 2023, '00:59:00.000000', 'CERRADO', '2023-09-04', '2023-09-04 08:00:00.000000', '2023-09-04 07:01:00.000000', 9, 'n/a', '1', 85, 6, b'0'),
	(52, 2023, '23:41:00.000000', 'CERRADO', '2023-09-05', '2023-09-07 10:00:00.000000', '2023-09-05 10:19:00.000000', 9, 'n/a', '1', 84, 6, b'0'),
	(53, 2023, '02:50:00.000000', 'CERRADO', '2023-09-05', '2023-09-05 09:50:00.000000', '2023-09-05 07:00:00.000000', 9, 'n/a', '1', 130, 6, b'0'),
	(54, 2023, '23:57:00.000000', 'CERRADO', '2023-09-06', '2023-09-07 11:22:00.000000', '2023-09-06 11:25:00.000000', 9, 'n/a', '1', 63, 6, b'0'),
	(55, 2023, '00:47:00.000000', 'CERRADO', '2023-09-07', '2023-09-07 13:11:00.000000', '2023-09-07 12:24:00.000000', 9, 'n/a', '1', 50, 6, b'0'),
	(56, 2023, '01:34:00.000000', 'CERRADO', '2023-09-07', '2023-08-10 11:45:00.000000', '2023-08-10 10:11:00.000000', 9, 'n/a', '1', 55, 6, b'0'),
	(57, 2023, '03:25:00.000000', 'CERRADO', '2023-09-08', '2023-09-08 10:33:00.000000', '2023-09-08 07:08:00.000000', 9, 'n/a', '1', 93, 6, b'0'),
	(58, 2023, '01:30:00.000000', 'CERRADO', '2023-09-11', '2023-09-11 10:30:00.000000', '2023-09-11 09:00:00.000000', 9, 'n/a', '1', 72, 5, b'0'),
	(59, 2023, '01:46:00.000000', 'CERRADO', '2023-09-11', '2023-09-11 10:30:00.000000', '2023-09-11 08:44:00.000000', 9, 'n/a', '1', 75, 6, b'0'),
	(60, 2023, '02:20:00.000000', 'CERRADO', '2023-09-11', '2023-09-11 08:20:00.000000', '2023-09-11 06:00:00.000000', 9, 'n/a', '1', 122, 6, b'0'),
	(61, 2023, '02:19:00.000000', 'CERRADO', '2023-09-12', '2023-09-12 10:16:00.000000', '2023-09-12 07:57:00.000000', 9, 'n/a', '1', 75, 6, b'0'),
	(62, 2023, '03:50:00.000000', 'CERRADO', '2023-09-12', '2023-09-14 13:11:00.000000', '2023-09-13 09:21:00.000000', 9, 'n/a', '1', 12, 6, b'0'),
	(63, 2023, '09:25:00.000000', 'CERRADO', '2023-09-13', '2023-09-19 16:25:00.000000', '2023-09-13 07:00:00.000000', 9, 'n/a', '1', 15, 6, b'0'),
	(64, 2023, '21:40:00.000000', 'CERRADO', '2023-09-18', '2023-09-19 07:00:00.000000', '2023-09-18 09:20:00.000000', 9, 'n/a', '1', 82, 6, b'1'),
	(65, 2023, '06:11:00.000000', 'CERRADO', '2023-09-27', '2023-09-14 13:11:00.000000', '2023-09-13 07:00:00.000000', 9, 'n/a', '1', 19, 6, b'0'),
	(66, 2023, '09:25:00.000000', 'CERRADO', '2023-09-27', '2023-09-13 16:25:00.000000', '2023-09-13 07:00:00.000000', 9, 'n/a', '1', 12, 6, b'0'),
	(67, 2023, '04:00:00.000000', 'CERRADO', '2023-09-27', '2023-09-13 11:00:00.000000', '2023-09-13 07:00:00.000000', 9, 'n/a', '1', 82, 6, b'0'),
	(68, 2023, '00:45:00.000000', 'CERRADO', '2023-09-28', '2023-09-28 08:45:00.000000', '2023-09-28 08:00:00.000000', 9, 'n/a', '1', 97, 6, b'0'),
	(69, 2023, '00:45:00.000000', 'CERRADO', '2023-09-28', '2023-09-28 08:45:00.000000', '2023-09-28 08:00:00.000000', 9, 'n/a', '1', 16, 6, b'0'),
	(70, 2023, '03:00:00.000000', 'CERRADO', '2023-09-29', '2023-09-29 11:00:00.000000', '2023-09-29 08:00:00.000000', 9, 'n/a', '1', 21, 6, b'0'),
	(71, 2023, '01:30:00.000000', 'CERRADO', '2023-09-29', '2023-09-29 09:30:00.000000', '2023-09-29 08:00:00.000000', 9, 'n/a', '1', 58, 6, b'0'),
	(72, 2023, '02:00:00.000000', 'CERRADO', '2023-09-29', '2023-09-19 17:00:00.000000', '2023-09-19 15:00:00.000000', 9, 'n/a', '1', 29, 6, b'0'),
	(73, 2023, '04:50:00.000000', 'CERRADO', '2023-10-02', '2023-10-02 11:50:00.000000', '2023-10-02 07:00:00.000000', 10, 'n/a', '1', 107, 6, b'0'),
	(74, 2023, '03:00:00.000000', 'CERRADO', '2023-10-02', '2023-10-02 10:00:00.000000', '2023-10-02 07:00:00.000000', 10, 'n/a', '1', 97, 6, b'0'),
	(75, 2023, '02:00:00.000000', 'CERRADO', '2023-10-02', '2023-10-02 09:00:00.000000', '2023-10-02 07:00:00.000000', 10, 'n/a', '1', 111, 6, b'0'),
	(76, 2023, '01:30:00.000000', 'CERRADO', '2023-10-02', '2023-10-02 08:30:00.000000', '2023-10-02 07:00:00.000000', 10, 'n/a', '1', 90, 6, b'0'),
	(77, 2023, '02:00:00.000000', 'CERRADO', '2023-10-10', '2023-10-10 17:00:00.000000', '2023-10-10 15:00:00.000000', 10, 'n/a', '1', 32, 6, b'0'),
	(78, 2023, '04:00:00.000000', 'CERRADO', '2023-10-10', '2023-10-10 11:00:00.000000', '2023-10-10 07:00:00.000000', 10, 'n/a', '1', 55, 6, b'0'),
	(79, 2023, '00:45:00.000000', 'CERRADO', '2023-10-10', '2023-10-10 08:45:00.000000', '2023-10-10 08:00:00.000000', 10, 'n/a', '1', 74, 6, b'0'),
	(80, 2023, '01:42:00.000000', 'CERRADO', '2023-10-10', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 10, 'n/a', '1', 143, 6, b'0'),
	(81, 2023, '00:00:00.000000', 'CERRADO', '2023-10-11', '2023-10-11 15:24:00.000000', '2023-10-11 15:24:00.000000', 10, 'n/a', '1', 86, 6, b'0'),
	(82, 2023, '00:00:00.000000', 'CERRADO', '2023-10-11', '2023-10-11 15:26:00.000000', '2023-10-11 15:26:00.000000', 10, 'n/a', '1', 97, 6, b'0'),
	(83, 2023, '00:00:00.000000', 'CERRADO', '2023-10-11', '2023-10-11 15:29:00.000000', '2023-10-11 15:29:00.000000', 10, 'n/a', '1', 70, 6, b'0'),
	(84, 2023, '00:00:00.000000', 'CERRADO', '2023-10-11', '2023-10-11 15:56:00.000000', '2023-10-11 15:56:00.000000', 10, 'n/a', '1', 115, 6, b'0'),
	(85, 2023, '07:00:00.000000', 'CERRADO', '2023-10-13', '2023-10-13 16:00:00.000000', '2023-10-13 09:00:00.000000', 10, 'n/a', '1', 11, 6, b'0'),
	(86, 2023, '06:00:00.000000', 'CERRADO', '2023-10-17', '2023-10-17 14:00:00.000000', '2023-10-17 08:00:00.000000', 10, 'n/a', '1', 99, 6, b'0'),
	(87, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 10, 'n/a', '1', 13, 6, b'0'),
	(88, 2023, '02:00:00.000000', 'CERRADO', '2023-11-01', '2023-11-01 16:00:00.000000', '2023-11-01 14:00:00.000000', 11, 'n/a', '1', 72, 6, b'0'),
	(89, 2023, '04:15:00.000000', 'CERRADO', '2023-11-02', '2023-11-02 13:00:00.000000', '2023-11-02 08:45:00.000000', 11, 'n/a', '1', 115, 6, b'0'),
	(90, 2023, '01:42:00.000000', 'CERRADO', '2023-11-03', '2023-11-03 11:09:00.000000', '2023-11-03 09:27:00.000000', 11, 'n/a', '1', 55, 6, b'0'),
	(91, 2023, '00:08:00.000000', 'CERRADO', '2023-11-03', '2023-11-03 10:56:00.000000', '2023-11-03 10:48:00.000000', 11, 'n/a', '1', 32, 6, b'0'),
	(92, 2023, '05:00:00.000000', 'CERRADO', '2023-11-08', '2023-11-08 15:30:00.000000', '2023-11-08 10:30:00.000000', 11, 'n/a', '1', 75, 6, b'0'),
	(93, 2023, '03:30:00.000000', 'CERRADO', '2023-11-08', '2023-11-08 14:30:00.000000', '2023-11-08 11:00:00.000000', 11, 'n/a', '1', 18, 6, b'0'),
	(94, 2023, '02:00:00.000000', 'CERRADO', '2023-11-08', '2023-11-08 13:30:00.000000', '2023-11-08 11:30:00.000000', 11, 'n/a', '1', 55, 6, b'0'),
	(95, 2023, '02:00:00.000000', 'CERRADO', '2023-11-10', '2023-11-10 09:30:00.000000', '2023-11-10 07:30:00.000000', 11, 'n/a', '1', 18, 6, b'0'),
	(96, 2023, '08:30:00.000000', 'CERRADO', '2023-11-14', '2023-11-14 16:00:00.000000', '2023-11-14 07:30:00.000000', 11, 'n/a', '1', 60, 6, b'0'),
	(97, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 107, 6, b'0'),
	(98, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 100, 6, b'0'),
	(99, 2023, '09:30:00.000000', 'CERRADO', '2023-11-20', '2023-11-20 17:00:00.000000', '2023-11-20 07:30:00.000000', 11, 'n/a', '1', 103, 6, b'0'),
	(100, 2023, '06:30:00.000000', 'CERRADO', '2023-11-20', '2023-11-20 14:00:00.000000', '2023-11-20 07:30:00.000000', 11, 'n/a', '1', 13, 6, b'0'),
	(101, 2023, '04:00:00.000000', 'CERRADO', '2023-11-27', '2023-11-27 16:00:00.000000', '2023-11-27 12:00:00.000000', 11, 'n/a', '1', 58, 6, b'0'),
	(102, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 22, 6, b'0'),
	(103, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 18, 6, b'0'),
	(104, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 106, 6, b'0'),
	(105, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 108, 6, b'0'),
	(106, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 97, 6, b'0'),
	(107, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 125, 6, b'0'),
	(108, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 81, 6, b'0'),
	(109, 2023, '03:20:00.000000', 'CERRADO', '2023-10-23', '2023-10-23 11:17:00.000000', '2023-10-23 07:57:00.000000', 11, 'n/a', '1', 126, 6, b'0'),
	(110, 2023, '02:43:00.000000', 'CERRADO', '2023-12-04', '2023-12-05 09:43:00.000000', '2023-12-04 07:00:00.000000', 12, 'n/a', '1', 84, 6, b'0'),
	(111, 2023, '02:43:00.000000', 'CERRADO', '2023-12-05', '2023-12-05 12:43:00.000000', '2023-12-05 10:00:00.000000', 12, 'n/a', '1', 18, 6, b'0'),
	(112, 2023, '01:43:00.000000', 'CERRADO', '2023-12-05', '2023-12-05 10:43:00.000000', '2023-01-02 09:00:00.000000', 12, 'n/a', '1', 60, 6, b'0'),
	(113, 2023, '08:33:00.000000', 'CERRADO', '2023-12-12', '2023-12-12 16:30:00.000000', '2023-12-12 07:57:00.000000', 12, 'n/a', '1', 74, 6, b'0'),
	(114, 2024, '07:59:00.000000', 'CERRADO', '2024-01-03', '2024-01-03 15:56:00.000000', '2024-01-03 07:57:00.000000', 1, 'n/a', '1', 13, 9, b'0'),
	(115, 2024, '01:56:00.000000', 'CERRADO', '2024-01-03', '2024-01-03 16:30:00.000000', '2024-01-03 14:34:00.000000', 1, 'n/a', '1', 20, 6, b'0'),
	(116, 2024, '02:23:00.000000', 'CERRADO', '2024-01-03', '2024-01-03 09:57:00.000000', '2024-01-03 07:34:00.000000', 1, 'n/a', '1', 35, 6, b'0'),
	(117, 2024, '01:56:00.000000', 'CERRADO', '2024-01-04', '2024-01-04 11:30:00.000000', '2024-01-04 09:34:00.000000', 1, 'n/a', '1', 49, 6, b'0'),
	(118, 2024, '03:22:00.000000', 'CERRADO', '2024-01-05', '2024-01-05 13:30:00.000000', '2024-01-05 10:08:00.000000', 1, 'n/a', '1', 103, 6, b'0'),
	(119, 2024, '02:56:00.000000', 'CERRADO', '2024-01-05', '2024-01-05 12:30:00.000000', '2024-01-05 09:34:00.000000', 1, 'n/a', '1', 49, 6, b'0'),
	(120, 2024, '00:54:00.000000', 'CERRADO', '2024-01-09', '2024-01-09 16:45:00.000000', '2024-01-09 15:51:00.000000', 1, 'n/a', '1', 122, 7, b'0'),
	(121, 2024, '05:49:00.000000', 'CERRADO', '2024-01-09', '2024-01-18 17:00:00.000000', '2024-01-09 11:11:00.000000', 1, 'n/a', '1', 71, 10, b'0'),
	(122, 2024, '23:49:00.000000', 'CERRADO', '2024-01-09', '2024-01-16 11:00:00.000000', '2024-01-09 11:11:00.000000', 1, 'n/a', '1', 82, 10, b'0'),
	(123, 2024, '20:39:00.000000', 'CERRADO', '2024-01-09', '2024-01-11 07:50:00.000000', '2024-01-09 11:11:00.000000', 1, 'n/a', '1', 89, 10, b'0'),
	(124, 2024, '23:32:00.000000', 'CERRADO', '2024-01-09', '2024-01-10 13:43:00.000000', '2024-01-09 14:11:00.000000', 1, 'n/a', '1', 109, 6, b'0'),
	(125, 2024, '05:42:00.000000', 'CERRADO', '2024-01-09', '2024-01-10 13:43:00.000000', '2024-01-09 08:01:00.000000', 1, 'n/a', '1', 98, 6, b'0'),
	(126, 2024, '22:32:00.000000', 'CERRADO', '2024-01-09', '2024-01-10 13:43:00.000000', '2024-01-09 15:11:00.000000', 1, 'n/a', '1', 71, 6, b'0'),
	(127, 2024, '00:32:00.000000', 'CERRADO', '2024-01-09', '2024-01-10 09:17:00.000000', '2024-01-09 08:45:00.000000', 1, 'n/a', '1', 19, 6, b'0'),
	(128, 2024, '00:51:00.000000', 'CERRADO', '2024-01-09', '2024-01-09 09:52:00.000000', '2024-01-09 09:01:00.000000', 1, 'n/a', '1', 92, 6, b'0'),
	(129, 2024, '07:07:00.000000', 'CERRADO', '2024-01-10', '2024-01-10 16:00:00.000000', '2024-01-10 08:53:00.000000', 1, 'n/a', '1', 22, 11, b'0'),
	(130, 2024, '18:30:00.000000', 'CERRADO', '2024-01-10', '2024-01-11 08:50:00.000000', '2024-01-10 14:20:00.000000', 1, 'n/a', '1', 140, 5, b'0'),
	(131, 2024, '17:11:00.000000', 'CERRADO', '2024-01-11', '2024-01-12 07:55:00.000000', '2024-01-11 14:44:00.000000', 1, 'n/a', '1', 70, 11, b'0'),
	(132, 2024, '00:16:00.000000', 'CERRADO', '2024-01-12', '2024-01-12 10:00:00.000000', '2024-01-12 09:44:00.000000', 1, 'n/a', '1', 118, 11, b'0'),
	(133, 2024, '02:54:00.000000', 'CERRADO', '2024-01-15', '2024-01-15 11:33:00.000000', '2024-01-15 08:39:00.000000', 1, 'n/a', '1', 94, 6, b'0'),
	(134, 2024, '00:54:00.000000', 'CERRADO', '2024-01-15', '2024-01-15 09:33:00.000000', '2024-01-15 08:39:00.000000', 1, 'n/a', '1', 33, 6, b'0'),
	(135, 2024, '01:10:00.000000', 'CERRADO', '2024-01-16', '2024-01-16 08:40:00.000000', '2024-01-16 07:30:00.000000', 1, 'n/a', '1', 26, 6, b'0'),
	(136, 2024, '04:06:00.000000', 'CERRADO', '2024-01-17', '2024-01-17 11:50:00.000000', '2024-01-17 07:44:00.000000', 1, 'n/a', '1', 75, 11, b'0'),
	(137, 2024, '04:06:00.000000', 'CERRADO', '2024-01-17', '2024-01-17 11:50:00.000000', '2024-01-17 07:44:00.000000', 1, 'n/a', '1', 22, 11, b'0'),
	(138, 2024, '00:36:00.000000', 'CERRADO', '2024-01-18', '2024-01-18 11:50:00.000000', '2024-01-18 11:14:00.000000', 1, 'n/a', '1', 34, 11, b'0'),
	(139, 2024, '07:30:00.000000', 'CERRADO', '2024-01-19', '2024-01-19 15:00:00.000000', '2024-01-19 07:30:00.000000', 1, 'n/a', '1', 35, 6, b'0'),
	(140, 2024, '03:40:00.000000', 'CERRADO', '2024-01-19', '2024-01-19 11:10:00.000000', '2024-01-19 07:30:00.000000', 1, 'n/a', '1', 115, 4, b'0'),
	(141, 2024, '10:30:00.000000', 'CERRADO', '2024-01-22', '2024-01-22 18:00:00.000000', '2024-01-22 07:30:00.000000', 1, 'n/a', '1', 94, 11, b'0'),
	(142, 2024, '01:00:00.000000', 'CERRADO', '2024-01-22', '2024-01-22 02:30:00.000000', '2024-01-22 01:30:00.000000', 1, 'n/a', '1', 12, 6, b'0'),
	(143, 2024, '02:00:00.000000', 'CERRADO', '2024-01-22', '2024-01-22 09:30:00.000000', '2024-01-22 07:30:00.000000', 1, 'n/a', '1', 25, 4, b'0'),
	(144, 2024, '06:33:00.000000', 'CERRADO', '2024-01-24', '2024-01-24 15:13:00.000000', '2024-01-24 08:40:00.000000', 1, 'n/a', '1', 136, 6, b'0'),
	(145, 2024, '22:00:00.000000', 'CERRADO', '2024-01-25', '2024-02-05 14:50:00.000000', '2024-01-25 16:50:00.000000', 1, 'n/a', '1', 111, 4, b'0'),
	(146, 2024, '21:59:00.000000', 'CERRADO', '2024-01-25', '2024-01-26 07:09:00.000000', '2024-01-25 09:10:00.000000', 1, 'n/a', '1', 99, 4, b'0'),
	(147, 2024, '03:40:00.000000', 'CERRADO', '2024-01-29', '2024-01-29 12:30:00.000000', '2024-01-29 08:50:00.000000', 1, 'n/a', '1', 63, 6, b'0'),
	(148, 2024, '21:40:00.000000', 'CERRADO', '2024-01-29', '2024-02-02 10:30:00.000000', '2024-01-29 12:50:00.000000', 1, 'n/a', '1', 55, 6, b'0'),
	(149, 2024, '01:00:00.000000', 'CERRADO', '2024-02-05', '2024-02-05 17:00:00.000000', '2024-02-05 16:00:00.000000', 2, 'n/a', '1', 94, 11, b'0'),
	(150, 2024, '22:51:00.000000', 'CERRADO', '2024-02-05', '2024-02-06 13:50:00.000000', '2024-02-05 14:59:00.000000', 2, 'n/a', '1', 139, 6, b'0'),
	(151, 2024, '18:01:00.000000', 'CERRADO', '2024-02-05', '2024-02-06 09:00:00.000000', '2024-02-05 14:59:00.000000', 2, 'n/a', '1', 93, 6, b'0'),
	(152, 2024, '01:00:00.000000', 'CERRADO', '2024-02-05', '2024-02-05 09:30:00.000000', '2024-02-05 08:30:00.000000', 2, 'n/a', '1', 74, 6, b'0'),
	(153, 2024, '00:40:00.000000', 'CERRADO', '2024-02-05', '2024-02-05 09:30:00.000000', '2024-02-05 08:50:00.000000', 2, 'n/a', '1', 18, 6, b'0'),
	(154, 2024, '01:00:00.000000', 'CERRADO', '2024-02-07', '2024-02-09 09:30:00.000000', '2024-02-07 08:30:00.000000', 2, 'n/a', '1', 122, 6, b'0'),
	(155, 2024, '02:00:00.000000', 'CERRADO', '2024-02-09', '2024-02-10 09:30:00.000000', '2024-02-09 07:30:00.000000', 2, 'n/a', '1', 58, 6, b'0'),
	(156, 2024, '00:00:00.000000', 'CERRADO', '2024-02-10', '2024-02-12 07:30:00.000000', '2024-02-10 07:30:00.000000', 2, 'n/a', '1', 97, 4, b'0'),
	(157, 2024, '03:30:00.000000', 'CERRADO', '2024-02-10', '2024-02-10 11:00:00.000000', '2024-02-10 07:30:00.000000', 2, 'n/a', '1', 74, 5, b'0'),
	(158, 2024, '12:20:00.000000', 'CERRADO', '2024-02-12', '2024-02-12 20:40:00.000000', '2024-02-12 08:20:00.000000', 2, 'n/a', '1', 29, 6, b'0'),
	(159, 2024, '01:00:00.000000', 'CERRADO', '2024-02-12', '2024-02-12 10:27:00.000000', '2024-02-12 09:27:00.000000', 2, 'n/a', '1', 118, 11, b'0'),
	(160, 2024, '03:00:00.000000', 'CERRADO', '2024-02-12', '2024-02-12 11:27:00.000000', '2024-02-12 08:27:00.000000', 2, 'n/a', '1', 99, 11, b'0'),
	(161, 2024, '00:00:00.000000', 'CERRADO', '2024-02-12', '2024-02-13 09:00:00.000000', '2024-02-12 09:00:00.000000', 2, 'n/a', '1', 11, 7, b'0'),
	(162, 2024, '08:00:00.000000', 'CERRADO', '2024-02-12', '2024-02-12 17:27:00.000000', '2024-02-12 09:27:00.000000', 2, 'n/a', '1', 70, 7, b'0'),
	(163, 2024, '02:00:00.000000', 'CERRADO', '2024-02-12', '2024-02-12 16:27:00.000000', '2024-02-12 14:27:00.000000', 2, 'n/a', '1', 135, 7, b'0'),
	(164, 2024, '03:00:00.000000', 'CERRADO', '2024-02-13', '2024-02-13 11:27:00.000000', '2024-02-13 08:27:00.000000', 2, 'n/a', '1', 143, 11, b'0'),
	(165, 2024, '09:00:00.000000', 'CERRADO', '2024-02-14', '2024-02-14 16:30:00.000000', '2024-02-14 07:30:00.000000', 2, 'n/a', '1', 33, 11, b'0'),
	(166, 2024, '23:03:00.000000', 'CERRADO', '2024-02-14', '2024-02-16 06:30:00.000000', '2024-02-14 07:27:00.000000', 2, 'n/a', '1', 94, 6, b'0'),
	(167, 2024, '03:03:00.000000', 'CERRADO', '2024-02-14', '2024-02-15 10:30:00.000000', '2024-02-14 07:27:00.000000', 2, 'n/a', '1', 115, 6, b'0'),
	(168, 2024, '09:03:00.000000', 'CERRADO', '2024-02-14', '2024-02-14 17:30:00.000000', '2024-02-14 08:27:00.000000', 2, 'n/a', '1', 133, 6, b'0'),
	(169, 2024, '10:03:00.000000', 'CERRADO', '2024-02-14', '2024-02-14 17:30:00.000000', '2024-02-14 07:27:00.000000', 2, 'n/a', '1', 145, 6, b'0'),
	(170, 2024, '08:10:00.000000', 'CERRADO', '2024-02-15', '2024-02-19 20:00:00.000000', '2024-02-15 11:50:00.000000', 2, 'n/a', '1', 143, 4, b'0'),
	(171, 2024, '07:40:00.000000', 'CERRADO', '2024-02-15', '2024-02-15 18:30:00.000000', '2024-02-15 10:50:00.000000', 2, 'n/a', '1', 42, 6, b'0'),
	(172, 2024, '18:25:00.000000', 'CERRADO', '2024-02-16', '2024-02-17 08:15:00.000000', '2024-02-16 13:50:00.000000', 2, 'n/a', '1', 52, 4, b'0'),
	(173, 2024, '00:25:00.000000', 'CERRADO', '2024-02-16', '2024-02-16 11:15:00.000000', '2024-02-16 10:50:00.000000', 2, 'n/a', '1', 143, 4, b'0'),
	(174, 2024, '23:30:00.000000', 'CERRADO', '2024-02-19', '2024-02-20 08:00:00.000000', '2024-02-19 08:30:00.000000', 2, 'n/a', '1', 63, 11, b'0'),
	(175, 2024, '07:45:00.000000', 'CERRADO', '2024-02-19', '2024-02-19 16:15:00.000000', '2024-02-19 08:30:00.000000', 2, 'n/a', '1', 92, 4, b'0'),
	(176, 2024, '07:00:00.000000', 'CERRADO', '2024-02-19', '2024-02-19 15:30:00.000000', '2024-02-19 08:30:00.000000', 2, 'n/a', '1', 74, 4, b'0'),
	(177, 2024, '00:05:00.000000', 'CERRADO', '2024-02-20', '2024-02-20 11:55:00.000000', '2024-02-20 11:50:00.000000', 2, 'n/a', '1', 145, 11, b'0'),
	(178, 2024, '23:00:00.000000', 'CERRADO', '2024-02-20', '2024-02-21 07:30:00.000000', '2024-02-20 08:30:00.000000', 2, 'n/a', '1', 26, 4, b'0'),
	(179, 2024, '08:00:00.000000', 'CERRADO', '2024-02-20', '2024-02-20 16:30:00.000000', '2024-02-20 08:30:00.000000', 2, 'n/a', '1', 115, 4, b'0'),
	(180, 2024, '07:30:00.000000', 'CERRADO', '2024-02-20', '2024-02-20 16:00:00.000000', '2024-02-20 08:30:00.000000', 2, 'n/a', '1', 12, 11, b'0'),
	(181, 2024, '08:00:00.000000', 'CERRADO', '2024-02-21', '2024-02-21 16:30:00.000000', '2024-02-21 08:30:00.000000', 2, 'n/a', '1', 55, 4, b'0'),
	(182, 2024, '02:00:00.000000', 'CERRADO', '2024-02-21', '2024-02-21 13:30:00.000000', '2024-02-21 11:30:00.000000', 2, 'n/a', '1', 82, 4, b'0'),
	(183, 2024, '08:00:00.000000', 'CERRADO', '2024-02-26', '2024-02-26 16:00:00.000000', '2024-02-26 08:00:00.000000', 2, 'n/a', '1', 26, 11, b'0'),
	(184, 2024, '08:00:00.000000', 'CERRADO', '2024-02-26', '2024-02-26 16:00:00.000000', '2024-02-26 08:00:00.000000', 2, 'n/a', '1', 33, 11, b'0'),
	(185, 2024, '03:40:00.000000', 'CERRADO', '2024-02-26', '2024-02-26 17:30:00.000000', '2024-02-26 13:50:00.000000', 2, 'n/a', '1', 93, 4, b'0'),
	(186, 2024, '03:00:00.000000', 'CERRADO', '2024-02-27', '2024-02-27 17:28:00.000000', '2024-02-27 14:28:00.000000', 2, 'n/a', '1', 136, 4, b'0'),
	(187, 2024, '02:02:00.000000', 'CERRADO', '2024-02-27', '2024-02-27 16:30:00.000000', '2024-02-27 14:28:00.000000', 2, 'n/a', '1', 58, 2, b'0'),
	(188, 2024, '07:02:00.000000', 'CERRADO', '2024-02-27', '2024-02-27 15:30:00.000000', '2024-02-27 08:28:00.000000', 2, 'n/a', '1', 118, 4, b'0'),
	(189, 2024, '01:00:00.000000', 'CERRADO', '2024-02-27', '2024-02-27 15:28:00.000000', '2024-02-27 14:28:00.000000', 2, 'n/a', '1', 44, 4, b'0'),
	(190, 2024, '02:02:00.000000', 'CERRADO', '2024-02-28', '2024-02-28 16:30:00.000000', '2024-02-28 14:28:00.000000', 2, 'n/a', '1', 58, 4, b'0'),
	(191, 2024, '01:02:00.000000', 'CERRADO', '2024-02-28', '2024-02-28 16:30:00.000000', '2024-02-28 15:28:00.000000', 2, 'n/a', '1', 33, 4, b'0'),
	(192, 2024, '01:00:00.000000', 'CERRADO', '2024-02-28', '2024-02-28 15:28:00.000000', '2024-02-28 14:28:00.000000', 2, 'n/a', '1', 45, 7, b'0'),
	(193, 2024, '01:00:00.000000', 'CERRADO', '2024-03-01', '2024-03-19 15:28:00.000000', '2024-03-01 14:28:00.000000', 3, 'n/a', '1', 29, 10, b'0'),
	(194, 2024, '01:00:00.000000', 'CERRADO', '2024-03-04', '2024-03-04 11:30:00.000000', '2024-03-04 10:30:00.000000', 3, 'n/a', '1', 82, 4, b'0'),
	(195, 2024, '14:00:00.000000', 'CERRADO', '2024-03-04', '2024-03-04 21:30:00.000000', '2024-03-04 07:30:00.000000', 3, 'n/a', '1', 79, 5, b'0'),
	(196, 2024, '09:00:00.000000', 'CERRADO', '2024-03-04', '2024-03-04 16:40:00.000000', '2024-03-04 07:40:00.000000', 3, 'n/a', '1', 115, 11, b'0'),
	(197, 2024, '06:00:00.000000', 'CERRADO', '2024-03-04', '2024-03-04 13:30:00.000000', '2024-03-04 07:30:00.000000', 3, 'n/a', '1', 125, 7, b'0'),
	(198, 2024, '06:00:00.000000', 'CERRADO', '2024-03-04', '2024-03-04 13:30:00.000000', '2024-03-04 07:30:00.000000', 3, 'n/a', '1', 52, 2, b'0'),
	(199, 2024, '08:00:00.000000', 'CERRADO', '2024-03-05', '2024-03-05 16:30:00.000000', '2024-03-05 08:30:00.000000', 3, 'n/a', '1', 26, 11, b'0'),
	(200, 2024, '08:00:00.000000', 'CERRADO', '2024-03-05', '2024-03-05 16:40:00.000000', '2024-03-05 08:40:00.000000', 3, 'n/a', '1', 74, 5, b'0'),
	(201, 2024, '02:00:00.000000', 'CERRADO', '2024-03-05', '2024-03-05 12:40:00.000000', '2024-03-05 10:40:00.000000', 3, 'n/a', '1', 20, 4, b'0'),
	(202, 2024, '01:00:00.000000', 'CERRADO', '2024-03-05', '2024-03-05 09:40:00.000000', '2024-03-05 08:40:00.000000', 3, 'n/a', '1', 58, 1, b'0'),
	(203, 2024, '09:00:00.000000', 'CERRADO', '2024-03-06', '2024-03-06 16:30:00.000000', '2024-03-06 07:30:00.000000', 3, 'n/a', '1', 96, 11, b'0'),
	(204, 2024, '07:15:00.000000', 'CERRADO', '2024-03-07', '2024-03-07 15:15:00.000000', '2024-03-07 08:00:00.000000', 3, 'n/a', '1', 111, 11, b'0'),
	(205, 2024, '00:00:00.000000', 'CERRADO', '2024-03-07', '2024-03-08 07:30:00.000000', '2024-03-07 07:30:00.000000', 3, 'n/a', '1', 33, 2, b'0'),
	(206, 2024, '02:00:00.000000', 'CERRADO', '2024-03-07', '2024-03-07 16:30:00.000000', '2024-03-07 14:30:00.000000', 3, 'n/a', '1', 99, 7, b'0'),
	(207, 2024, '06:00:00.000000', 'CERRADO', '2024-03-07', '2024-03-07 16:30:00.000000', '2024-03-07 10:30:00.000000', 3, 'n/a', '1', 129, 6, b'0'),
	(208, 2024, '08:00:00.000000', 'CERRADO', '2024-03-07', '2024-03-07 15:30:00.000000', '2024-03-07 07:30:00.000000', 3, 'n/a', '1', 143, 7, b'0'),
	(209, 2024, '03:00:00.000000', 'CERRADO', '2024-03-11', '2024-03-12 11:00:00.000000', '2024-03-11 08:00:00.000000', 3, 'n/a', '1', 90, 2, b'0'),
	(210, 2024, '08:00:00.000000', 'CERRADO', '2024-03-11', '2024-03-11 16:00:00.000000', '2024-03-11 08:00:00.000000', 3, 'n/a', '1', 57, 11, b'0'),
	(211, 2024, '08:00:00.000000', 'CERRADO', '2024-03-11', '2024-03-11 16:00:00.000000', '2024-03-11 08:00:00.000000', 3, 'n/a', '1', 77, 11, b'0'),
	(212, 2024, '07:30:00.000000', 'CERRADO', '2024-03-11', '2024-03-11 15:30:00.000000', '2024-03-11 08:00:00.000000', 3, 'n/a', '1', 59, 5, b'0'),
	(213, 2024, '01:00:00.000000', 'CERRADO', '2024-03-11', '2024-03-11 09:00:00.000000', '2024-03-11 08:00:00.000000', 3, 'n/a', '1', 127, 7, b'0'),
	(214, 2024, '08:00:00.000000', 'CERRADO', '2024-03-12', '2024-03-12 16:00:00.000000', '2024-03-12 08:00:00.000000', 3, 'n/a', '1', 118, 7, b'0'),
	(215, 2024, '08:00:00.000000', 'CERRADO', '2024-03-12', '2024-03-12 16:00:00.000000', '2024-03-12 08:00:00.000000', 3, 'n/a', '1', 82, 6, b'0'),
	(216, 2024, '08:00:00.000000', 'CERRADO', '2024-03-12', '2024-03-12 16:00:00.000000', '2024-03-12 08:00:00.000000', 3, 'n/a', '1', 112, 7, b'0'),
	(217, 2024, '00:00:00.000000', 'CERRADO', '2024-03-12', '2024-03-12 08:00:00.000000', '2024-03-12 08:00:00.000000', 3, 'n/a', '1', 143, 5, b'0'),
	(218, 2024, '01:00:00.000000', 'CERRADO', '2024-03-13', '2024-03-13 08:00:00.000000', '2024-03-13 07:00:00.000000', 3, 'n/a', '1', 33, 7, b'0'),
	(219, 2024, '09:00:00.000000', 'CERRADO', '2024-03-14', '2024-03-13 16:00:00.000000', '2024-03-13 07:00:00.000000', 3, 'n/a', '1', 86, 7, b'0'),
	(220, 2024, '00:30:00.000000', 'CERRADO', '2024-03-20', '2024-03-20 15:30:00.000000', '2024-03-20 15:00:00.000000', 3, 'n/a', '1', 135, 11, b'0'),
	(221, 2024, '07:30:00.000000', 'CERRADO', '2024-03-20', '2024-03-20 16:30:00.000000', '2024-03-20 09:00:00.000000', 3, 'n/a', '1', 135, 4, b'0'),
	(222, 2024, '04:30:00.000000', 'CERRADO', '2024-03-20', '2024-03-20 12:30:00.000000', '2024-03-20 08:00:00.000000', 3, 'n/a', '1', 78, 4, b'0'),
	(223, 2024, '03:00:00.000000', 'CERRADO', '2024-03-21', '2024-03-21 11:30:00.000000', '2024-03-21 08:30:00.000000', 3, 'n/a', '1', 149, 11, b'0'),
	(224, 2024, '04:00:00.000000', 'CERRADO', '2024-03-21', '2024-03-21 11:00:00.000000', '2024-03-21 07:00:00.000000', 3, 'n/a', '1', 58, 4, b'0'),
	(225, 2024, '01:10:00.000000', 'CERRADO', '2024-03-22', '2024-03-22 09:40:00.000000', '2024-03-22 08:30:00.000000', 3, 'n/a', '1', 25, 4, b'0'),
	(226, 2024, '04:23:00.000000', 'CERRADO', '2024-03-22', '2024-03-22 14:53:00.000000', '2024-03-22 10:30:00.000000', 3, 'n/a', '1', 50, 4, b'0'),
	(227, 2024, '01:10:00.000000', 'CERRADO', '2024-03-22', '2024-03-22 09:40:00.000000', '2024-03-22 08:30:00.000000', 3, 'n/a', '1', 136, 4, b'0'),
	(228, 2024, '01:00:00.000000', 'CERRADO', '2024-03-22', '2024-03-22 09:30:00.000000', '2024-03-22 08:30:00.000000', 3, 'n/a', '1', 118, 7, b'0'),
	(229, 2024, '00:30:00.000000', 'CERRADO', '2024-03-26', '2024-04-02 09:00:00.000000', '2024-03-26 08:30:00.000000', 3, 'n/a', '1', 26, 2, b'0'),
	(230, 2024, '02:36:00.000000', 'CERRADO', '2024-03-26', '2024-03-26 17:00:00.000000', '2024-03-26 14:24:00.000000', 3, 'n/a', '1', 32, 7, b'0'),
	(231, 2024, '08:00:00.000000', 'CERRADO', '2024-03-26', '2024-03-26 16:30:00.000000', '2024-03-26 08:30:00.000000', 3, 'n/a', '1', 149, 2, b'0'),
	(232, 2024, '00:32:00.000000', 'CERRADO', '2024-03-26', '2024-03-26 16:10:00.000000', '2024-03-26 15:38:00.000000', 3, 'n/a', '1', 50, 7, b'0'),
	(233, 2024, '01:55:00.000000', 'CERRADO', '2024-03-26', '2024-03-26 15:30:00.000000', '2024-03-26 13:35:00.000000', 3, 'n/a', '1', 84, 4, b'0'),
	(234, 2024, '00:45:00.000000', 'CERRADO', '2024-04-01', '2024-04-01 15:45:00.000000', '2024-04-01 15:00:00.000000', 4, 'n/a', '1', 76, 6, b'0'),
	(235, 2024, '04:03:00.000000', 'CERRADO', '2024-04-02', '2024-04-02 14:32:00.000000', '2024-04-02 10:29:00.000000', 4, 'n/a', '1', 42, 6, b'0'),
	(236, 2024, '01:03:00.000000', 'CERRADO', '2024-04-05', '2024-04-05 08:32:00.000000', '2024-04-05 07:29:00.000000', 4, 'n/a', '1', 26, 7, b'0'),
	(237, 2024, '01:03:00.000000', 'CERRADO', '2024-04-05', '2024-04-05 08:32:00.000000', '2024-04-05 07:29:00.000000', 4, 'n/a', '1', 111, 7, b'0'),
	(238, 2024, '00:00:00.000000', 'CERRADO', '2024-04-05', '2024-04-06 08:29:00.000000', '2024-04-05 08:29:00.000000', 4, 'n/a', '1', 15, 4, b'0'),
	(239, 2024, '00:00:00.000000', 'CERRADO', '2024-04-05', '2024-04-06 08:29:00.000000', '2024-04-05 08:29:00.000000', 4, 'n/a', '1', 53, 2, b'0'),
	(240, 2024, '01:03:00.000000', 'CERRADO', '2024-04-05', '2024-04-05 08:32:00.000000', '2024-04-05 07:29:00.000000', 4, 'n/a', '1', 144, 6, b'0'),
	(241, 2024, '08:00:00.000000', 'CERRADO', '2024-04-06', '2024-04-06 16:29:00.000000', '2024-04-06 08:29:00.000000', 4, 'n/a', '1', 62, 2, b'0'),
	(242, 2024, '00:30:00.000000', 'CERRADO', '2024-04-08', '2024-04-08 08:30:00.000000', '2024-04-08 08:00:00.000000', 4, 'n/a', '1', 125, 6, b'0'),
	(243, 2024, '02:21:00.000000', 'CERRADO', '2024-04-09', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 4, 'n/a', '1', 74, 6, b'0'),
	(244, 2024, '04:37:00.000000', 'CERRADO', '2024-04-09', '2024-04-12 13:00:00.000000', '2024-04-09 08:23:00.000000', 4, 'n/a', '1', 142, 4, b'0'),
	(245, 2024, '08:37:00.000000', 'CERRADO', '2024-04-09', '2024-04-09 17:00:00.000000', '2024-04-09 08:23:00.000000', 4, 'n/a', '1', 35, 4, b'0'),
	(246, 2024, '00:43:00.000000', 'CERRADO', '2024-04-09', '2024-04-09 08:29:00.000000', '2024-04-09 07:46:00.000000', 4, 'n/a', '1', 112, 6, b'0'),
	(247, 2024, '01:51:00.000000', 'CERRADO', '2024-04-10', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 4, 'n/a', '1', 129, 6, b'0'),
	(248, 2024, '19:45:00.000000', 'CERRADO', '2024-04-10', '2024-04-13 09:48:00.000000', '2024-04-10 14:03:00.000000', 4, 'n/a', '1', 122, 2, b'0'),
	(249, 2024, '09:30:00.000000', 'CERRADO', '2024-04-10', '2024-04-10 17:00:00.000000', '2024-04-10 07:30:00.000000', 4, 'n/a', '1', 136, 5, b'0'),
	(250, 2024, '06:06:00.000000', 'CERRADO', '2024-04-10', '2024-04-10 14:47:00.000000', '2024-04-10 08:41:00.000000', 4, 'n/a', '1', 18, 4, b'0'),
	(251, 2024, '06:06:00.000000', 'CERRADO', '2024-04-10', '2024-04-10 14:47:00.000000', '2024-04-10 08:41:00.000000', 4, 'n/a', '1', 95, 4, b'0'),
	(252, 2024, '06:20:00.000000', 'CERRADO', '2024-04-10', '2024-04-10 14:23:00.000000', '2024-04-10 08:03:00.000000', 4, 'n/a', '1', 17, 6, b'0'),
	(253, 2024, '01:49:00.000000', 'CERRADO', '2024-04-10', '2024-04-10 09:19:00.000000', '2024-04-10 07:30:00.000000', 4, 'n/a', '1', 26, 5, b'0'),
	(254, 2024, '00:30:00.000000', 'CERRADO', '2024-04-10', '2024-04-10 08:30:00.000000', '2024-04-10 08:00:00.000000', 4, 'n/a', '1', 100, 6, b'0'),
	(255, 2024, '00:45:00.000000', 'CERRADO', '2024-04-11', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 4, 'n/a', '1', 118, 6, b'0'),
	(256, 2024, '09:00:00.000000', 'CERRADO', '2024-04-12', '2024-04-12 16:15:00.000000', '2024-04-12 07:15:00.000000', 4, 'n/a', '1', 75, 6, b'0'),
	(257, 2024, '03:15:00.000000', 'CERRADO', '2024-04-16', '2024-04-16 10:45:00.000000', '2024-04-16 07:30:00.000000', 4, 'n/a', '1', 115, 6, b'0'),
	(258, 2024, '03:00:00.000000', 'CERRADO', '2024-04-16', '2024-04-09 10:30:00.000000', '2024-04-09 07:30:00.000000', 4, 'n/a', '1', 84, 6, b'0'),
	(259, 2024, '01:00:00.000000', 'CERRADO', '2024-04-16', '2024-04-16 11:20:00.000000', '2024-04-16 10:20:00.000000', 4, 'n/a', '1', 139, 11, b'0'),
	(261, 2024, '00:35:00.000000', 'CERRADO', '2024-04-16', '2024-04-16 10:00:00.000000', '2024-04-16 09:25:00.000000', 4, 'n/a', '1', 33, 4, b'0'),
	(264, NULL, NULL, 'ABIERTO', '2024-11-27', NULL, '2024-11-28 22:30:00.000000', NULL, 'REPORTE ECHO A EL PROVEEDOR', NULL, 22, 1, b'0'),
	(268, NULL, NULL, 'ABIERTO', '2025-01-20', NULL, '2025-01-21 17:39:00.000000', NULL, 'dfdsfsd', NULL, 70, 1, b'0');

-- Volcando estructura para tabla bitacora_bd.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.roles: ~2 rows (aproximadamente)
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'ADMIN'),
	(2, 'TECNICO');

-- Volcando estructura para tabla bitacora_bd.teclados
CREATE TABLE IF NOT EXISTS `teclados` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_compra` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.teclados: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.traslado
CREATE TABLE IF NOT EXISTS `traslado` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_traslado` varbinary(255) DEFAULT NULL,
  `motivo_traslado` varchar(255) DEFAULT NULL,
  `id_ciudad` bigint(20) DEFAULT NULL,
  `id_farmacia` bigint(20) DEFAULT NULL,
  `id_proveedor` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7xdi6l2mfm5bqplkmt9tlxelc` (`id_ciudad`),
  KEY `FK3vava1qxbb0n1t9ytcv7xs0t6` (`id_farmacia`),
  KEY `FKoldkbdbscdsrpq1fqg9ucv1qs` (`id_proveedor`),
  CONSTRAINT `FK3vava1qxbb0n1t9ytcv7xs0t6` FOREIGN KEY (`id_farmacia`) REFERENCES `farmacias` (`id`),
  CONSTRAINT `FK7xdi6l2mfm5bqplkmt9tlxelc` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id`),
  CONSTRAINT `FKoldkbdbscdsrpq1fqg9ucv1qs` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor_internet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.traslado: ~0 rows (aproximadamente)

-- Volcando estructura para tabla bitacora_bd.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `updated_at` datetime(6) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeljjw3mx8n5ngoe7fbqbjwusp` (`role_id`),
  CONSTRAINT `FKeljjw3mx8n5ngoe7fbqbjwusp` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bitacora_bd.usuarios: ~2 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `created_at`, `password`, `status`, `updated_at`, `username`, `role_id`) VALUES
	(1, '2024-10-20 19:45:23.000000', '12345', 1, '2024-10-20 19:45:23.000000', 'RROJASR_31', 1),
	(2, '2024-10-20 19:48:29.000000', '09876', 1, '2024-10-20 19:48:29.000000', 'RTECNICO', 2);

-- Volcando estructura para disparador bitacora_bd.reporte_before_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `reporte_before_insert` BEFORE INSERT ON `reporte` FOR EACH ROW BEGIN
IF NEW.fecha_hora_inicio IS NOT NULL AND NEW.fecha_hora_fin IS NOT NULL THEN
		SET NEW.duracion_incidente = SEC_TO_TIME(
			TIMESTAMPDIFF(SECOND, NEW.fecha_hora_inicio, NEW.fecha_hora_fin)
		);
		END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
