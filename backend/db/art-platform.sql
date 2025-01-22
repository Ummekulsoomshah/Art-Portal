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
SELECT
posts.id as post_id,
posts.description as post_description,
posts.image as post_image,
posts.created_at as post_created_at,
users.username as username
FROM posts
JOIN users
where posts.user_id=users.id;

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

INSERT INTO likes (user_id,post_id) VALUES (1,1);
INSERT INTO likes (user_id,post_id) VALUES (1,2);
INSERT INTO likes (user_id,post_id) VALUES (2,2);

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

SELECT 
posts.description as description,
posts.image as image,
posts.created_at as created_at,
users.username as author,
comments.comment as comment_text,
comments.created_at as comment_created_at,
COUNT(distinct likes.id) as likes_count
from posts
left join users on users.id=posts.user_id
left join likes on likes.post_id=posts.id
left join comments on comments.post_id=posts.id
GROUP BY posts.id, users.id;

SELECT
posts.id as post_id,
posts.description as post_description,
posts.image as post_image,
posts.created_at as post_created_at,
users.username as username,
COUNT(distinct likes.id) as likes_count
from posts
left join users on users.id=posts.user_id
left join likes on likes.post_id=posts.id
GROUP BY posts.id, users.id;

SELECT 
comments.id as comment_id,
comments.comment as comment,
comments.created_at as comment_created_at,
users.username as comment_author
from comments
INNER JOIN users ON comments.user_id = users.id
WHERE comments.post_id = 2;


SELECT
 posts.id,
  posts.description,
  posts.image,
  users.username AS author,
  COUNT(likes.id) AS likes_count
  from posts
  LEFT JOIN users on posts.user_id=users.id
  LEFT JOIN likes ON likes.post_id = posts.id
  GROUP BY posts.id, users.id
ORDER BY likes_count DESC
LIMIT 10;
  
SELECT 
    'like' AS type,
    likes.user_id AS actor_id,
    posts.user_id AS recipient_id,
    likes.post_id,
    likes.created_at
FROM likes
INNER JOIN posts ON likes.post_id = posts.id
WHERE posts.user_id = 3

UNION ALL

SELECT 
    'comment' AS type,
    comments.user_id AS actor_id,
    posts.user_id AS recipient_id,
    comments.post_id,
    comments.created_at
FROM comments
INNER JOIN posts ON comments.post_id = posts.id
WHERE posts.user_id = 3

ORDER BY created_at DESC;


