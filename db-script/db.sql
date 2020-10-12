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
code CHAR(4) NOT NULL,
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


INSERT INTO locations  VALUES (NULL,'Neste Ouluntulli', 'Pohjantie 1364, 90450 Kempele, Suomi', 64.93949, 25.534542, 'Neste Ouluntulli 1.jpg');
INSERT INTO locations  VALUES (NULL,'Hesburger Parkano', 'Pahkalantie 3, 39700 Parkano, Finland', 62.005091, 23.01012, 'Hesburger Parkano 9.jpg');
INSERT INTO locations  VALUES (NULL,'Hotelli Inari', 'Inarintie 40, 99870 Inari, Finland', 68.906898, 27.026894, 'Hotelli Inari 20.jpg');
INSERT INTO locations  VALUES (NULL,'Rajabaari Neste', 'Käsivarrentie 3767, 99470 Karesuvanto, Finland', 68.449527, 22.482289, 'Rajabaari Neste 4.jpg');
INSERT INTO locations  VALUES (NULL,'Kokkola Minimani', 'Energiatie, 67100 Kokkola, Suomi', 63.835359, 23.113082, 'Kokkola Minimani 5.jpg');
INSERT INTO locations  VALUES (NULL,'Kajaani airfield', 'Lentokentäntie, 87850 Paltaniemi, Finland', 64.280678, 27.747153, 'Kajaani Airfield 7.jpg');
INSERT INTO locations  VALUES (NULL,'Kauppakeskus Maili', 'Ajokatu 53-55', 60.963704, 25.656747, 'Kauppakeskus Maili 3.jpg');
INSERT INTO locations  VALUES (NULL,'Majatalo Villanen', 'Kauppilantie 3, 35400 JÄMSÄ', 61.729632, 24.801129, 'Majatalo Villanen 14.jpg');
INSERT INTO locations  VALUES (NULL,'Motonet Kaarina', 'Varastomiehenkatu 4, 20780 Kaarina, Finland', 60.421751, 22.378079, 'Motonet Kaarina 17.jpg');
INSERT INTO locations  VALUES (NULL,'SEO Käyrämön Keidas', 'Sodankyläntie 6789, 97540 Tiainen', 66.956262, 26.296221, 'SEO Käyrämön Keidas 10.jpg');
INSERT INTO locations  VALUES (NULL,'Lähi-ABC Kontiolahti ', 'Uurolantie 4, 80770 Kontiolahti, Finland', 62.714987, 29.857018, 'Lähi-ABC Kontionlahti 11.jpg');
INSERT INTO locations  VALUES (NULL,'Sandösunds Camping', '25 Trollvägen, 22550, Ahvenanmaa', 60.268553, 20.391858, 'Sandösunds Camping 12.jpg');
INSERT INTO locations  VALUES (NULL,'Nikkilän linja-autoasema', 'Iso Kylätie 18, 04130 Sipoo, Suomi', 60.376168, 25.267906, 'Nikkilän linja-autoasema 2.jpg');
INSERT INTO locations  VALUES (NULL,'Pori Airport/HERTZ Pori', 'Lentoasemantie 1, 28500 Pori, Suomi', 61.468973, 21.792922, 'Pori Airport 13.jpg');
INSERT INTO locations  VALUES (NULL,'Ähtärin Eläinpuisto', 'Karhunkierros 150, Ähtäri', 62.535733, 24.183459, 'Ähtärin Eläinpuisto 15.jpg');
INSERT INTO locations  VALUES (NULL,'VÄRE, Liikenneasema Koskelo', 'Ysitie 3399, 77600 Suonenjoki', 62.586781, 27.052153, 'VÄRE Liikenneasema Koskelo 16.jpg');
INSERT INTO locations  VALUES (NULL,'Tammisaari ', 'Asematie 2, Tammisaari', 59.976418, 23.438303, 'Tammisaari Railway Station 8.jpg');
INSERT INTO locations  VALUES (NULL,'Sastamalan Osuuspankki', 'Puistokatu 2, 38200 Sastamala, Suomi', 61.342082, 22.908408, 'Sastamalan Osuuspankki 18.jpg');
INSERT INTO locations  VALUES (NULL,'Prisma Kangasala', 'Mäkirinteentie 10 36220 Kangasala Finland', 61.476166, 23.978113, 'Prisma Kangasala 19.jpg');
INSERT INTO locations  VALUES (NULL,'Prisma Ylivieska', 'Savarinkatu 9, 84100 Ylivieska', 64.060311, 24.556345, 'Prisma Ylivieska 6.jpg');


INSERT INTO prices VALUES (NULL, 0.20, 'kWh');
INSERT INTO prices VALUES (NULL, 0.18, 'min');
INSERT INTO prices VALUES (NULL, 0.0, 'free');

INSERT INTO connectors VALUES (NULL, 'CCS', 'CCS.png');
INSERT INTO connectors VALUES (NULL, 'TYPE 2', 'Type2.png');

INSERT INTO stations  VALUES (NULL, 'Fast', 1);
INSERT INTO stations VALUES  (NULL,  'Fast', 2);
INSERT INTO stations VALUES  (NULL, 'Fast', 3);
INSERT INTO stations  VALUES (NULL,  'Fast', 4);
INSERT INTO stations  VALUES (NULL, 'Fast', 5);
INSERT INTO stations  VALUES (NULL, 'Fast', 6);
INSERT INTO stations  VALUES (NULL, 'Fast', 7);
INSERT INTO stations  VALUES (NULL, 'Fast', 8);
INSERT INTO stations  VALUES (NULL, 'Fast', 9);
INSERT INTO stations  VALUES (NULL, 'Fast', 10);
INSERT INTO stations  VALUES (NULL, 'Slow', 11);
INSERT INTO stations  VALUES (NULL, 'Slow', 12);
INSERT INTO stations  VALUES (NULL, 'Slow', 13);
INSERT INTO stations  VALUES (NULL, 'Slow', 14);
INSERT INTO stations  VALUES (NULL, 'Slow', 15);
INSERT INTO stations  VALUES (NULL, 'Slow', 16);
INSERT INTO stations  VALUES (NULL, 'Slow', 17);
INSERT INTO stations  VALUES (NULL, 'Slow', 18);
INSERT INTO stations  VALUES (NULL, 'Slow', 19);
INSERT INTO stations  VALUES (NULL, 'Slow', 20);

INSERT INTO outlets VALUES (NULL, 'A4FE', 'Available', '50', 1, 1, 1);
INSERT INTO outlets VALUES  (NULL, 'B5ER', 'Available' ,'50', 2, 1, 1);
INSERT INTO outlets VALUES  (NULL, 'C8PW', 'Available' , '50', 3, 1, 1);
INSERT INTO outlets  VALUES (NULL, 'D0RT', 'Available' , '50', 4, 1, 1);
INSERT INTO outlets  VALUES (NULL, 'E7QE', 'Available', '50', 5, 1, 1);
INSERT INTO outlets  VALUES (NULL, 'F6OI', 'Available', '100', 6, 1, 1);
INSERT INTO outlets  VALUES (NULL, 'G3FD', 'Available', '100', 7, 1, 1);
INSERT INTO outlets  VALUES (NULL, 'H5BV', 'Available', '100', 8, 1, 1);
INSERT INTO outlets  VALUES (NULL, 'I3CS', 'Available', '150', 9, 1, 1);
INSERT INTO outlets  VALUES (NULL, 'J3AW', 'Available', '150', 10, 1, 1);
INSERT INTO outlets  VALUES (NULL, 'K6QX', 'Available', '22', 11, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'L9MM', 'Available', '22', 12, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'M1IZ', 'Available', '22', 13, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'N4UX', 'Available', '22', 14, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'O1YV', 'Available', '22', 15, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'P6TB', 'Available', '22', 16, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'Q9RN', 'Available', '22', 17, 2, 2);
INSERT INTO outlets  VALUES (NULL, 'R5EM', 'Available', '22', 18, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'S3WL', 'Available', '22', 19, 2, 3);
INSERT INTO outlets  VALUES (NULL, 'T0QK', 'Available', '22', 20, 2, 3);


-- testing


