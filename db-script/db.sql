CREATE DATABASE EVCS;
use EVCS;

CREATE TABLE IF NOT EXISTS Locations (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(50) NOT NULL,
address varchar(100) NOT NULL,
lat float(10, 6) NOT NULL,
lng float(10, 6) NOT NULL
);

INSERT INTO Locations (name, address, lat, lng) VALUES ('Neste Ouluntulli', 'Pohjantie 1364, 90450 Kempele, Suomi', 64.93949, 25.534542);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Pyhtää Supercharger', 'Kotitie 10, 49270 Pyhtää, Finland', 60.489054, 26.554835);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Vierumäki Supercharger', 'Tervalammentie 1, 19110 Vierumäki, Finland', 61.112431, 25.929829);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Rajabaari Neste', 'Käsivarrentie 3767, 99470 Karesuvanto, Finland', 68.449527, 22.482289);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Kokkola Minimani', 'Energiatie, 67100 Kokkola, Suomi', 63.835359, 23.113082);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Jokilaaksojen OPKK', 'Kauppakatu 11, 84100 Ylivieska, Suomi', 64.074004, 24.537067);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Sonkajärven OP', 'Rutakontie 36, 74300 Sonkajärvi', 63.667842, 27.523252);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Baggö Marina', 'Baggövägen 1275, 10600 Tammisaari, Finland', 59.890269, 23.509696);
INSERT INTO Locations (name, address, lat, lng) VALUES ('M-Market Kihniö', 'Kihniöntie 51, 39820 Kihniö, Finland', 62.210816, 23.178509);
INSERT INTO Locations (name, address, lat, lng) VALUES ('SEO Käyrämön Keidas', 'Sodankyläntie 6789, 97540 Tiainen', 66.956262, 26.296221);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Lähi-ABC Kontiolahti ', 'Uurolantie 4, 80770 Kontiolahti, Finland', 62.714987, 29.857018);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Sandösunds Camping', '25 Trollvägen, 22550, Ahvenanmaa', 60.268553, 20.391858);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Kivikylän Palvaamo', 'Savulaaksontie 12127230 Lappi', 61.112303, 21.784804);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Kuhmalahden Kauppa', 'Kuhmalahdentie 56, 36810 Kuhmalahti', 61.504545, 24.562178);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Ähtärin Eläinpuisto', 'Karhunkierros 150, Ähtäri', 62.535733, 24.183459);
INSERT INTO Locations (name, address, lat, lng) VALUES ('VÄRE, Liikenneasema Koskelo', 'Ysitie 3399, 77600 Suonenjoki', 62.586781, 27.052153);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Kuhmoisten OP', 'Toritie 51, 17800 Kuhmoinen', 61.563382, 25.182505);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Sastamalan Osuuspankki', 'Puistokatu 2, 38200 Sastamala, Suomi', 61.342082, 22.908408);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Prisma Kangasala', 'Mäkirinteentie 10 36220 Kangasala Finland', 61.476166, 23.978113);
INSERT INTO Locations (name, address, lat, lng) VALUES ('Pyhäjärvi Supercharger', 'Liiketie 2, 86800 Pyhäjärvi', 63.716298, 25.920103);

ALTER TABLE Locations ADD COLUMN img VARCHAR(50) NOT NULL DEFAULT 'default-img' AFTER id;
UPDATE Locations SET img = 'default-img.png' where id >= 0;
