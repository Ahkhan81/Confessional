DROP DATABASE IF EXISTS confess;
CREATE DATABASE confess;
USE confess;

SET FOREIGN_KEY_CHECKS=0;

-- Admin table
DROP TABLE IF EXISTS admin_user;
CREATE TABLE admin_user( 
admin_id MEDIUMINT UNSIGNED AUTO_INCREMENT,
username VARCHAR(30) UNIQUE,
email VARCHAR(40),
fname VARCHAR(50),
lname VARCHAR(50),
phone_number CHAR(10),
pwd VARCHAR(12) NOT NULL,
PRIMARY KEY(admin_id)
) ENGINE=INNODB;

-- Admins action type table
DROP TABLE IF EXISTS action;
CREATE TABLE action(
action_num INT UNSIGNED AUTO_INCREMENT,
action_type VARCHAR(50) UNIQUE,
PRIMARY KEY(action_num)
) ENGINE=INNODB;

INSERT INTO action
(action_type)
VALUES
('remove member'), ('verify event'), ('approve member'), ('restrict member'),  ('update member'), ('create new action type');

-- Admin Action table
DROP TABLE IF EXISTS admin_action;
CREATE TABLE admin_action(
action_num INT UNSIGNED AUTO_INCREMENT,
action_type VARCHAR(50), -- Read only from action table
admin_id MEDIUMINT UNSIGNED,
action_time  DATETIME,  -- time(now)
serviceID INT UNSIGNED,
PRIMARY KEY(action_num),
FOREIGN KEY(admin_id) 
REFERENCES admin_user(admin_id), 
FOREIGN KEY(action_type) 
REFERENCES action(action_type) 
) ENGINE=INNODB;

DROP TABLE IF EXISTS hashes;
CREATE TABLE hashes(
user_id MEDIUMINT UNSIGNED,
username VARCHAR(30),
hashval VARCHAR(128),
PRIMARY KEY(hashval),
FOREIGN KEY(user_id)
REFERENCES users(user_id)
ON DELETE CASCADE
  )
ENGINE=INNODB;

DROP TABLE IF EXISTS user_logins;
CREATE TABLE user_logins(
user_id MEDIUMINT UNSIGNED,
timestamp TIMESTAMP,
PRIMARY KEY(user_id),
 FOREIGN KEY(user_id)
 REFERENCES users(user_id)
)
ENGINE=INNODB;

DROP TABLE IF EXISTS users;
  CREATE TABLE users(
  user_id MEDIUMINT UNSIGNED AUTO_INCREMENT,
  username VARCHAR(30) UNIQUE,
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL,
  user_email VARCHAR(40),
  user_type ENUM('Faculty', 'Staff',  'Student'),
  PRIMARY KEY(user_id)
  ) ENGINE=INNODB;

SET FOREIGN_KEY_CHECKS=0;
  
DROP TABLE IF EXISTS categories;
CREATE TABLE categories(
category_id MEDIUMINT UNSIGNED AUTO_INCREMENT,
category_name VARCHAR(40) UNIQUE,
admin_id MEDIUMINT UNSIGNED,   # who is in charge
PRIMARY KEY(category_id),
FOREIGN KEY(admin_id) 
REFERENCES admin_user(admin_id)
)
ENGINE=INNODB;

DROP TABLE IF EXISTS message;
CREATE TABLE message
(
 msg_id CHAR(64),
 user_id MEDIUMINT UNSIGNED,
 msg_time TIMESTAMP,
 msg_text TEXT,
 category_id MEDIUMINT UNSIGNED,
 msg_thread MEDIUMINT,    # be careful 
 PRIMARY KEY(msg_id),
 FOREIGN KEY(user_id)
 REFERENCES users(user_id),
 FOREIGN KEY(category_id)
 REFERENCES categories(category_id)
) ENGINE=INNODB;

DROP TABLE IF EXISTS usergroup;
CREATE TABLE usergroup(
group_id MEDIUMINT UNSIGNED AUTO_INCREMENT,
group_num MEDIUMINT UNSIGNED,    # subgroup w/in category?
category_id MEDIUMINT UNSIGNED,
category_name VARCHAR(40), 
user_name VARCHAR(30),   # users of category 
user_id MEDIUMINT UNSIGNED,
PRIMARY KEY(group_id),
FOREIGN KEY(category_id) 
REFERENCES categories(category_id),
FOREIGN KEY(user_id)
REFERENCES users(user_id)
)
ENGINE=INNODB;
  
INSERT INTO users
(username, fname, lname, user_email, user_type)
VALUES
 ('tanachi', 'Lewis', 'Katt', 'lew@smcm.edu',  'Faculty'),
('framer', 'Dorothy', 'Benson', 'dot@smcm.edu',  'Faculty'),
('keezer', 'William', 'Sheth', 'bill@smcm.edu',  'Student'),
('gibs', 'Gilbert', 'Hazlewood', 'gib@smcm.edu',  'Student'),
('benmaster', 'Ben', 'Lee', 'bennie@smcm.edu',  'Student');

INSERT INTO admin_user
(username, email, fname, lname, phone_number, pwd)
VALUES
('pazzui', 'geo@smcm.edu', 'George', 'Washington', '2234567890', 'bddj&dF24');

INSERT INTO categories
(category_name, admin_id)
VALUES
('Clubs', 1);

INSERT INTO message
(user_id, msg_id, msg_time,  msg_text, category_id, msg_thread)
VALUES
(2, 'sjjU&$565kl', NOW(), 'Big test, little test.', 1, 1);
 
INSERT INTO message
(user_id, msg_id, msg_time,  msg_text, category_id, msg_thread)
VALUES
(3, 'gTHQ7$5kl', NOW(), 'Sum things.', 1, 1);

select * from users;
select * from message;
select * from admin_user;
