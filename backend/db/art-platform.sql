CREATE DATABASE art_platform;
USE art_platform;

CREATE TABLE users 
(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
role VARCHAR(255) default 'user',
created_at timestamp default current_timestamp 
);