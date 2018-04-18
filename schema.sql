DROP DATABASE IF EXISTS restaurant;
CREATE DATABASE restaurant;

USE restaurant;

CREATE TABLE reservations (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
phone VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
displayid VARCHAR(255) NOT NULL
);

CREATE TABLE waitlist (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
phone VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
displayid VARCHAR(255) NOT NULL
);

INSERT INTO reservations(name,phone,email,displayid)
VALUES("Res 1", "Res Phone Number 1", "Res Email 1", "Res ID 1");

INSERT INTO reservations(name,phone,email,displayid)
VALUES("Res 2", "Res Phone Number 2", "Res Email 2", "Res ID 2");

INSERT INTO reservations(name,phone,email,displayid)
VALUES("Res 3", "Res Phone Number 3", "Res Email 3", "Res ID 3");

INSERT INTO reservations(name,phone,email,displayid)
VALUES("Res 4", "Res Phone Number 4", "Res Email 4", "Res ID 4");

INSERT INTO reservations(name,phone,email,displayid)
VALUES("Res 5", "Res Phone Number 5", "Res Email 5", "Res ID 5");

INSERT INTO waitlist(name,phone,email,displayid)
VALUES("Res 6", "Res Phone Number 6", "Res Email 6", "Res ID 6");

INSERT INTO waitlist(name,phone,email,displayid)
VALUES("Res 7", "Res Phone Number 7", "Res Email 7", "Res ID 7");

INSERT INTO waitlist(name,phone,email,displayid)
VALUES("Res 8", "Res Phone Number 8", "Res Email 8", "Res ID 8");