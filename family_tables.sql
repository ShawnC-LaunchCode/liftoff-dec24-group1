CREATE TABLE user (
id VARCHAR (21) NOT NULL PRIMARY KEY,
person_id VARCHAR(21),
name VARCHAR (50)NOT NULL,
email VARCHAR (100) NOT NULL UNIQUE,
password VARCHAR (60) NOT NULL,
last_login DATETIME NULL DEFAULT NULL,
);

CREATE TABLE person (
id VARCHAR(21) NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
birth_date DATE,
death_date DATE, 
birth_town VARCHAR(50),
bio VARCHAR(500),
user_id VARCHAR(21) NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE image (
id VARCHAR(21) NOT NULL PRIMARY KEY, 
url VARCHAR(248) NOT NULL,
user_id VARCHAR(21) NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE person_person (
root_person VARCHAR(21) NOT NULL,
related_person VARCHAR(21) NOT NULL, 
relationship VARCHAR(50) NOT NULL,
PRIMARY KEY (root_person, related_person),
FOREIGN KEY (root_person) REFERENCES person(id),
FOREIGN KEY (related_person) REFERENCES person(id)
);

CREATE TABLE person_image(
root_person VARCHAR(21) NOT NULL,
related_image VARCHAR(21) NOT NULL,
PRIMARY KEY (root_person, related_image),
FOREIGN KEY (root_person) REFERENCES person(id),
FOREIGN KEY (related_image) REFERENCES image(id)
);

CREATE TABLE blog (
header VARCHAR(50) NOT NULL,
body VARCHAR(5000),
image_url VARCHAR(248),
user_id VARCHAR(21),
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE blog_comments (
body VARCHAR(500) NOT NULL,
update_dt TIMESTAMP,
user_id VARCHAR(21),
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);


-- ALTER queries

ALTER TABLE user
ADD CONSTRAINT fk_person FOREIGN KEY (person_id) REFERENCES person(id);

ALTER TABLE blog_comments
ADD COLUMN id VARCHAR(21);

ALTER TABLE blog_comments
CHANGE user_id userId VARCHAR(21);

ALTER TABLE blog_comments
CHANGE update_dt createdAt TIMESTAMP;

ALTER TABLE blog_comments
ADD COLUMN username VARCHAR(21);

ALTER TABLE blog_comments
ADD COLUMN parentId VARCHAR(21);