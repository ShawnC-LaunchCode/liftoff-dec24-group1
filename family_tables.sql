CREATE TABLE user (
id VARCHAR (21) NOT NULL PRIMARY KEY,
name VARCHAR (50)NOT NULL,
email VARCHAR (100) NOT NULL UNIQUE,
password VARCHAR (60) NOT NULL,
last_login DATETIME NULL DEFAULT NULL
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













