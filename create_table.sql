CREATE DATABASE insta_app;

USE insta_app;

CREATE TABLE user(
id VARCHAR(50) PRIMARY KEY,
username VARCHAR(50) UNIQUE,
email VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(50) NOT NULL
);

INSERT INTO user
VALUES("aas12", "sam", "sam@gmail.com", "pass1"),
("aas13","Jas", "jas@hotmail.com", "pass2");

SELECT * FROM user;
