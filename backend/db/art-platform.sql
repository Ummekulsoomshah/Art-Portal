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

CREATE TABLE posts
(
id INT AUTO_INCREMENT PRIMARY KEY,
description TEXT NOT NULL,
image TEXT NOT NULL,
user_id INT NOT NULL,
created_at timestamp default current_timestamp,
FOREIGN KEY (user_id) REFERENCES users(id) 
);

CREATE TABLE likes
(
id int AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
post_id INT NOT NULL,
created_at timestamp DEFAULT current_timestamp,
UNIQUE (user_id,post_id),
foreign key (user_id) REFERENCES users(id),
foreign key (post_id) REFERENCES posts(id)
);

CREATE TABLE comments
(
id int AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
post_id INT NOT NULL,
comment TEXT NOT NULL,
created_at timestamp DEFAULT current_timestamp,
foreign key (user_id) REFERENCES users(id),
foreign key (post_id) REFERENCES posts(id)
);

CREATE TABLE notifications
(
id INT AUTO_INCREMENT PRIMARY KEY,
recipient_id INT NOT NULL,
actor_id INT NOT NULL,
post_id INT NOT NULL,
type ENUM('LIKE','COMMENT') NOT NULL,
message TEXT NOT NULL,
is_read BOOLEAN DEFAULT FALSE,
created_at timestamp default current_timestamp,
foreign key (recipient_id) references users(id),
foreign key (actor_id) references users(id),
foreign key (post_id) references posts(id)	
);
