-- Database script --

DROP TABLE outlets;
DROP TABLE stations;
DROP TABLE history;
DROP TABLE locations;
DROP TABLE prices;
DROP TABLE connectors;
DROP TABLE users;

CREATE DATABASE EVCS;
use EVCS;

CREATE TABLE IF NOT EXISTS locations (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(50) NOT NULL,
address varchar(100) NOT NULL,
lat float(10, 6) NOT NULL,
lng float(10, 6) NOT NULL,
img VARCHAR(50) NOT NULL DEFAULT 'default-img.png'
);

CREATE TABLE IF NOT EXISTS prices (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
payment DECIMAL(5,2) NOT NULL,
unit VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS connectors (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(10) NOT NULL,
img VARCHAR(50) NOT NULL DEFAULT 'default-image.png'
);

CREATE TABLE IF NOT EXISTS users (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS stations (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
type CHAR(4) NOT NULL,
location INT NULL,
FOREIGN KEY (location) REFERENCES locations(id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS outlets (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
code CHAR(4) NOT NULL UNIQUE,
status VARCHAR(12) NOT NULL,
power VARCHAR(10) NOT NULL,
station INT NOT NULL,
connector INT NOT NULL,
price INT NOT NULL,
FOREIGN KEY (station) REFERENCES stations(id),
FOREIGN KEY (price) REFERENCES prices(id),
FOREIGN KEY (connector) REFERENCES connectors(id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS history (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
charge_time DATETIME NOT NULL,
charge_duration INT UNSIGNED NOT NULL,
energy_used SMALLINT UNSIGNED NOT NULL,
cost DECIMAL(5,2) NOT NULL,
user INT NOT NULL,
location INT NOT NULL,
FOREIGN KEY (user) REFERENCES users(id),
FOREIGN KEY (location) REFERENCES locations(id)
) ENGINE=INNODB;




-- prices --
INSERT INTO prices VALUES (NULL, 0.20, 'kWh');
INSERT INTO prices VALUES (NULL, 0.18, 'min');
INSERT INTO prices VALUES (NULL, 0.0, 'free');

-- connectors --
INSERT INTO connectors VALUES (NULL, 'CCS', 'CCS.png');
INSERT INTO connectors VALUES (NULL, 'TYPE 2', 'Type2.png');

--  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 1
INSERT INTO locations  VALUES (NULL,'Neste Ouluntulli', 'Pohjantie 1364, 90450 Kempele, Suomi', 64.93949, 25.534542, 'Neste Ouluntulli 1.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 1);
INSERT INTO outlets VALUES (NULL, 'A4FE', 'In use', '50', 1, 1, 1);
INSERT INTO stations VALUES (NULL, 'Fast', 1);
INSERT INTO outlets VALUES (NULL, 'A5FF', 'Available', '100', 2, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Fast', 1);
INSERT INTO outlets  VALUES (NULL, 'C7PF', 'Available', '100', 3, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 1);
INSERT INTO outlets  VALUES (NULL, 'O7LN', 'Available', '22', 4, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'V0KF', 'Available', '22', 4, 2, 3);
 -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
 -- location 2
INSERT INTO locations  VALUES (NULL,'Hesburger Parkano', 'Pahkalantie 3, 39700 Parkano, Finland', 62.005091, 23.01012, 'Hesburger Parkano 9.jpg');
INSERT INTO stations VALUES  (NULL,  'Fast', 2);
INSERT INTO outlets VALUES  (NULL, 'B5ER', 'Available' ,'50', 5, 1, 1);
INSERT INTO stations VALUES  (NULL,  'Slow', 2);
INSERT INTO outlets VALUES  (NULL, 'B8PW', 'Available' , '22', 6, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 2);
INSERT INTO outlets  VALUES (NULL, 'G5OP', 'In use', '22', 7, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'H1EK', 'Available', '22', 7, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 2);
INSERT INTO outlets  VALUES (NULL, 'J3QD', 'Available', '22', 8, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'Z2XP', 'Available', '22', 8, 2, 3);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- location 3
INSERT INTO locations  VALUES (NULL,'Hotelli Inari', 'Inarintie 40, 99870 Inari, Finland', 68.906898, 27.026894, 'Hotelli Inari 20.jpg');
INSERT INTO stations VALUES  (NULL, 'Slow', 3);
INSERT INTO outlets  VALUES (NULL, 'D0RT', 'Available' , '22', 9, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'E7QE', 'Available', '22', 9, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Fast', 3);
INSERT INTO outlets  VALUES (NULL, 'F6OI', 'Available', '50', 10, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 3);
INSERT INTO outlets  VALUES (NULL, 'M2UG', 'Available', '22', 11, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'V1PN', 'Available', '22', 11, 2, 3);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- location 4
INSERT INTO locations  VALUES (NULL,'Rajabaari Neste', 'Käsivarrentie 3767, 99470 Karesuvanto, Finland', 68.449527, 22.482289, 'Rajabaari Neste 4.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 4);
INSERT INTO outlets  VALUES (NULL, 'M0DK', 'Available', '50', 12, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 4);
INSERT INTO outlets  VALUES (NULL, 'G3KD', 'Available', '22', 13, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'H0BV', 'Available', '22', 13, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'I3JS', 'Available', '22', 13, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'J3YB', 'Available', '22', 13, 2, 3);
INSERT INTO stations  VALUES (NULL, 'Fast', 4);
INSERT INTO outlets  VALUES (NULL, 'T1UE', 'Available', '50', 14, 1, 1);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 5
INSERT INTO locations  VALUES (NULL,'Kokkola Minimani', 'Energiatie, 67100 Kokkola, Suomi', 63.835359, 23.113082, 'Kokkola Minimani 5.jpg');
INSERT INTO stations  VALUES (NULL, 'Slow', 5);
INSERT INTO outlets  VALUES (NULL, 'Z3CD', 'Available', '22', 15, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'H0MG', 'Available', '22', 15, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 5);
INSERT INTO outlets  VALUES (NULL, 'Q3FO', 'In use', '22', 16, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'F5VV', 'In use', '22', 16, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 5);
INSERT INTO outlets  VALUES (NULL, 'G2FL', 'Available', '22', 17, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'H1BV', 'Available', '22', 17, 2, 2);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 6
INSERT INTO locations  VALUES (NULL,'Kajaani airfield', 'Lentokentäntie, 87850 Paltaniemi, Finland', 64.280678, 27.674823, 'Kajaani Airfield 7.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 6);
INSERT INTO outlets  VALUES (NULL, 'G4CD', 'Available', '100', 18, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 6);
INSERT INTO outlets  VALUES (NULL, 'J7BJ', 'In use', '22', 19, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'L3WM', 'In use', '22', 19, 2, 3);
INSERT INTO stations  VALUES (NULL, 'Fast', 6);
INSERT INTO outlets  VALUES (NULL, 'P9KW', 'Available', '50', 20, 1, 1);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 7
INSERT INTO locations VALUES (NULL, 'Lähi-ABC Kontiolahti', 'Uurolantie 4, 80770 Kontiolahti, Finland', 62.714987, 29.857018, 'Lähi-ABC Kontionlahti 11.jpg');
INSERT INTO stations  VALUES (NULL, 'Slow', 7);
INSERT INTO outlets  VALUES (NULL, 'M1IZ', 'Available', '22', 21, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'N4UX', 'Available', '22', 21, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 7);
INSERT INTO outlets  VALUES (NULL, 'M1GG', 'Available', '22', 22, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'V2OR', 'In use', '22', 22, 2, 3);
INSERT INTO stations  VALUES (NULL, 'Fast', 7);
INSERT INTO outlets  VALUES (NULL, 'C3OP', 'Available', '150', 23, 1, 1);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 8
INSERT INTO locations  VALUES (NULL,'Kauppakeskus Maili', 'Ajokatu 53-55', 60.963704, 25.656747, 'Kauppakeskus Maili 3.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 8);
INSERT INTO outlets  VALUES (NULL, 'G3FD', 'Available', '100', 24, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 8);
INSERT INTO outlets  VALUES (NULL, 'G0NP', 'Available', '22', 25, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'H3OK', 'Available', '22', 25, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Fast', 8);
INSERT INTO outlets  VALUES (NULL, 'H5BV', 'Available', '100', 26, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 8);
INSERT INTO outlets  VALUES (NULL, 'Q9RN', 'In use', '22', 27, 2, 2);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 9
INSERT INTO locations  VALUES (NULL,'Majatalo Villanen', 'Kauppilantie 3, 35400 JÄMSÄ', 61.729632, 24.801129, 'Majatalo Villanen 14.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 9);
INSERT INTO outlets  VALUES (NULL, 'H5EF', 'Available', '150', 28, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Fast', 9);
INSERT INTO outlets  VALUES (NULL, 'H5BH', 'Available', '50', 29, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 9);
INSERT INTO outlets  VALUES (NULL, 'G5TP', 'In use', '22', 30, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'H1SK', 'Available', '22', 30, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 9);
INSERT INTO outlets  VALUES (NULL, 'J3LD', 'Available', '22', 31, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'Z5YP', 'Available', '22', 31, 2, 3);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 10
INSERT INTO locations  VALUES (NULL,'Motonet Kaarina', 'Varastomiehenkatu 4, 20780 Kaarina, Finland', 60.421751, 22.378079, 'Motonet Kaarina 17.jpg');
INSERT INTO stations  VALUES (NULL, 'Slow', 10);
INSERT INTO outlets  VALUES (NULL, 'D4UD', 'Available', '22', 32, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'P1NX', 'Available', '22', 32, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'D6AF', 'Available', '22', 32, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'L9OP', 'In use', '22', 32, 2, 3);
INSERT INTO stations  VALUES (NULL, 'Slow', 10);
INSERT INTO outlets  VALUES (NULL, 'E7LU', 'Available', '22', 33, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'P0CB', 'In use', '22', 33, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'Q6UI', 'Available', '22', 33, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'W0LQ', 'Available', '22', 33, 2, 2);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 11
INSERT INTO locations  VALUES (NULL,'SEO Käyrämön Keidas', 'Sodankyläntie 6789, 97540 Tiainen', 66.956262, 26.296221, 'SEO Käyrämön Keidas 10.jpg');
INSERT INTO stations  VALUES (NULL, 'Slow', 11);
INSERT INTO outlets  VALUES (NULL, 'N4FH', 'Available', '22', 34, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'U1XV', 'Available', '22', 34, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 11);
INSERT INTO outlets  VALUES (NULL, 'A6TR', 'Available', '22', 35, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'P8GH', 'Available', '22', 35, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 11);
INSERT INTO outlets  VALUES (NULL, 'Z7FD', 'Available', '22', 36, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'C4RT', 'Available', '22', 36, 2, 3);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 12
INSERT INTO locations  VALUES (NULL,'Sandösunds Camping', '25 Trollvägen, 22550, Ahvenanmaa', 60.268553, 20.391858, 'Sandösunds Camping 12.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 12);
INSERT INTO outlets  VALUES (NULL, 'Y1CX', 'Available', '50', 37, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 12);
INSERT INTO outlets  VALUES (NULL, 'K6QX', 'Available', '22', 38, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'L9MM', 'In use', '22', 38, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'M1VZ', 'Available', '22', 38, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'N2OX', 'Available', '22', 38, 2, 2);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 13
INSERT INTO locations  VALUES (NULL,'Nikkilän linja-autoasema', 'Iso Kylätie 18, 04130 Sipoo, Suomi', 60.376168, 25.267906, 'Nikkilän linja-autoasema 2.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 13);
INSERT INTO outlets  VALUES (NULL, 'M3CK', 'Available', '50', 39, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Fast', 13);
INSERT INTO outlets  VALUES (NULL, 'T1FN', 'Available', '50', 40, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 13);
INSERT INTO outlets  VALUES (NULL, 'S3PC', 'Available', '22', 41, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'A0XK', 'Available', '22', 41, 2, 2);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 14
INSERT INTO locations  VALUES (NULL,'Pori Airport/HERTZ Pori', 'Lentoasemantie 1, 28500 Pori, Suomi', 61.468973, 21.792922, 'Pori Airport 13.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 14);
INSERT INTO outlets  VALUES (NULL, 'W4ER', 'Available', '100', 42, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Fast', 14);
INSERT INTO outlets  VALUES (NULL, 'P5OI', 'Available', '100', 43, 1, 1);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 15
INSERT INTO locations  VALUES (NULL,'Ähtärin Eläinpuisto', 'Karhunkierros 150, Ähtäri', 62.535733, 24.183459, 'Ähtärin Eläinpuisto 15.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 15);
INSERT INTO outlets  VALUES (NULL, 'G3JD', 'Available', '150', 44, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Fast', 15);
INSERT INTO outlets  VALUES (NULL, 'O5VF', 'In use', '50', 45, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 15);
INSERT INTO outlets  VALUES (NULL, 'E1YV', 'Available', '22', 46, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'P8DB', 'Available', '22', 46, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'Q0RM', 'In use', '22', 46, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'W5RM', 'Available', '22', 46, 2, 2);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- location 16
INSERT INTO locations  VALUES (NULL,'VÄRE, Liikenneasema Koskelo', 'Ysitie 3399, 77600 Suonenjoki', 62.586781, 27.052153, 'VÄRE Liikenneasema Koskelo 16.jpg');
INSERT INTO stations  VALUES (NULL, 'Slow', 16);
INSERT INTO outlets  VALUES (NULL, 'K0IO', 'Available', '22', 47, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'O4YH', 'Available', '22', 47, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 16);
INSERT INTO outlets  VALUES (NULL, 'J7BV', 'Available', '22', 48, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'L3XC', 'Available', '22', 48, 2, 3);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- location 17
INSERT INTO locations  VALUES (NULL,'Tammisaari ', 'Asematie 2, Tammisaari', 59.976418, 23.438303, 'Tammisaari Railway Station 8.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 17);
INSERT INTO outlets  VALUES (NULL, 'G3XL', 'Available', '100', 49, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Fast', 17);
INSERT INTO outlets  VALUES (NULL, 'H5TR', 'Available', '50', 50, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 17);
INSERT INTO outlets  VALUES (NULL, 'G6OE', 'In use', '22', 51, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'H0XK', 'Available', '22', 51, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Fast', 17);
INSERT INTO outlets  VALUES (NULL, 'K6GN', 'Available', '100', 52, 1, 1);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- location 18
INSERT INTO locations  VALUES (NULL,'Sastamalan Osuuspankki', 'Puistokatu 2, 38200 Sastamala, Suomi', 61.342082, 22.908408, 'Sastamalan Osuuspankki 18.jpg');
INSERT INTO stations  VALUES (NULL, 'Slow', 18);
INSERT INTO outlets  VALUES (NULL, 'B6KJ', 'Available', '22', 53, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'N0CE', 'Available', '22', 53, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 18);
INSERT INTO outlets  VALUES (NULL, 'O5BX', 'Available', '22', 54, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'P0XM', 'Available', '22', 54, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Slow', 18);
INSERT INTO outlets  VALUES (NULL, 'T5OW', 'Available', '22', 55, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'C2GB', 'Available', '22', 55, 2, 2);
INSERT INTO stations  VALUES (NULL, 'Fast', 18);
INSERT INTO outlets  VALUES (NULL, 'G9WZ', 'Available', '100', 56, 1, 1);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- location 19
INSERT INTO locations  VALUES (NULL,'Prisma Kangasala', 'Mäkirinteentie 10 36220 Kangasala Finland', 61.476166, 23.978113, 'Prisma Kangasala 19.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 19);
INSERT INTO outlets  VALUES (NULL, 'T8GH', 'In use', '150', 57, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Fast', 19);
INSERT INTO outlets  VALUES (NULL, 'I0HD', 'Available', '150', 58, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 19);
INSERT INTO outlets  VALUES (NULL, 'O5PX', 'Available', '22', 59, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'D4HZ', 'Available', '22', 59, 2, 2);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- locatioin 20
INSERT INTO locations  VALUES (NULL,'Prisma Ylivieska', 'Savarinkatu 9, 84100 Ylivieska', 64.060311, 24.556345, 'Prisma Ylivieska 6.jpg');
INSERT INTO stations  VALUES (NULL, 'Fast', 20);
INSERT INTO outlets  VALUES (NULL, 'Y1VP', 'Available', '50', 60, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Fast', 20);
INSERT INTO outlets  VALUES (NULL, 'C7PT', 'In use', '100', 61, 1, 1);
INSERT INTO stations  VALUES (NULL, 'Slow', 20);
INSERT INTO outlets  VALUES (NULL, 'O7LM', 'Available', '22', 62, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'V3KF', 'Available', '22', 62, 2, 3);
INSERT INTO stations  VALUES (NULL, 'Slow', 20);
INSERT INTO outlets  VALUES (NULL, 'B8KK', 'Available', '22', 63, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'M6JD', 'In use', '22', 63, 2, 3);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 


-- testing --

