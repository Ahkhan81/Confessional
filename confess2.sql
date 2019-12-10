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
login_id INT UNSIGNED AUTO_INCREMENT,
user_id MEDIUMINT UNSIGNED,
time_in TIMESTAMP,
time_out TIMESTAMP,
PRIMARY KEY(login_id),
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
 thread_title VARCHAR(50) NOT NULL, 	# watch this too 
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
('gogoo', 'soose@smcm.edu', 'Pane', 'Willis', '4052453895', '%G0j&dF99'),
('samred', 'squelo@smcm.edu', 'Ike', 'Humphrey', '3122564001', 'Pk7j7U*05'),
('gloo2', 'goose@smcm.edu', 'Lane', 'Landis', '2122453895', 'l8fj&dF24'),
('jimro', 'eatmo@smcm.edu', 'George', 'Jones', '8472564001', 'J7dj7U*g2'),
('hector1', 'feeder@smcm.edu', 'Fred', 'Levington', '7792655914', 'M8dj&9)Sc'),
('twister', 'twis@smcm.edu', 'Linda', 'Brown', '2534569775', 'd7dj&%*H3');


INSERT INTO categories
(category_name, admin_id)
VALUES
('Administration', 1), ('Events', 1), ('SGA', 1), ('Majors', 1), ('Sports', 1);

INSERT INTO categories
(category_name, admin_id)
VALUES
('Clubs', 1);

INSERT INTO message
(user_id, msg_id, msg_time,  msg_text, category_id, msg_thread)
VALUES
(2, 'sjjU&$565kl', NOW(), 'Big test, little test.', 1, 2);
 
INSERT INTO message
(user_id, msg_id, msg_time,  msg_text, category_id, msg_thread)
VALUES
(4, '8&hvX78$kl', NOW(), 'Did this work?', 7, 1);

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO message
(user_id, msg_id, msg_time,  msg_text, category_id, msg_thread, thread_title)
VALUES
(1, '9LXZC5ULA26M8OU80T58YFRDPAWXHPFY',  NOW(), 'The quick brown Ice jumped over ME!', 7, 1, "Christmas"),
(2, 'R6R9PG8WJBA8OJONKQYDLM7QY62TRKO9',  NOW(), 'The quick brown Heiroglyphs jumped over YOU!', 3, 1, "Candy"),
(4, 'K9E7FXBJUVRTTC13O860UH3H0S9VZC72',  NOW(), 'The quick brown Meat Cleaver jumped over HIM!', 5, 1, "Christmas"), 
(5, 'VC98BCEV7UZ8UNXP1XEHUL3ZSC6NV6PE',  NOW(), 'The quick brown Slayer jumped over HER!', 4, 1, "Candy"), 
(3, 'EHTFUJAHCGD79ZZLJTOI8J4R34RDC6TO',  NOW(), 'The quick brown Artifact jumped over THEM!', 1, 1, "Christmas"), 
(3, 'Y012JR5RH4TFUX7XBQK8VYMKWCTDNY4D',  NOW(), 'The quick brown Romanticism jumped over THE MOON!', 3, 1, "Candy"), 
(2, '3LYVCJK9MZ5YFZVNGR4K7T5XYZ9Z712C',  NOW(), 'The quick brown Pears jumped over YOUR SHOES!', 4, 1, "Christmas"), 
(5, '9W4K94RXQDH6WQVGD1DWSTTFRUQXBYEF',  NOW(), 'The quick brown Yggdrasil jumped over HARPOONS!', 6, 1, "Candy"), 
(2, 'NZTYGE76KMC66922WLGVSIFE2UA73YPZ',  NOW(), 'The quick brown Howl\'s Castle jumped over 2-in-1!', 5, 1, "Christmas"), 
(1, 'DTZ4D04Q70OQ5N3GRXH2ROG8WNTSINQ3',  NOW(), 'The quick brown Creosote Oil jumped over A COW!', 6, 1, "Toys"), 
(5, 'BXBXI7C7QQL7CWW1TF69Y6QCVIL2EPX3',  NOW(), 'The quick brown The Tower jumped over ANOTHER FOX!', 1, 1, "Christmas"), 
(4, 'J3UNDARAL74OMQ83HJZ78618LV12CQNX',  NOW(), 'The quick brown Dust Bunnies jumped over Mr. Watch!', 3, 1, "Toys"), 
(4, '86KWOU5UDYG0ZPR9U4UTJA3YBIBH4093',  NOW(), 'The quick brown Banana Slugs jumped over Isaac!', 4, 1, "Christmas"), 
(3, 'XSYC0J2MXQW0FTYY01EL64NVF3912T9G',  NOW(), 'The quick brown Hitscan jumped over Alan!', 6, 1, "Toys"), 
(2, '76GNDK89Y1FKVIZYRCCJNKHANY8GIJYL',  NOW(), 'The quick brown Tsar Bomba jumped over Vivec', 5, 1, "Christmas"), 
(1, 'K88NDK89Y1FKVIZYRCCJNKHANY8GH8GG',  NOW(), 'The quick brown Dada jumped over Mournhold', 1, 1, "Toys"), 
(5, '0PWN55WYYECTO0XIAFMC59DMRSBF9N3D',  NOW(), 'The quick brown Frogs jumped over Grand Exchange', 4, 1, "Christmas"), 
(2, 'XUX15T8G47NP1UW6SUQW9KWGEGHJ5RJB',  NOW(), 'The quick brown Leon jumped over A difficult puzzle', 3, 1, "Toys"), 
(5, 'CW0LDIUN4FTHQ9WX899TSWAWEBQ3A441',  NOW(), 'The quick brown Lantern jumped over A HORSE!', 6, 1, "Christmas"), 
(3, 'VTM41ZD82C4VYWLTU4UVX6BPIG6K4KEH',  NOW(), 'The quick brown Roadrunner jumped over A low Spade!', 1, 1, "Toys");

INSERT INTO users
(username, fname, lname, user_email)
VALUES
 ('benny', 'Cosmo', 'Crouch', 'beno@smcm.edu');

INSERT INTO usergroup
(group_num, category_id, category_name, user_name, user_id)
VALUES
(1, 1, 'Clubs', 'tanachi',1),
(1, 6, 'Sports', 'gibs',4),
(1, 2, 'Administration', 'framer', 2),
(1, 2, 'SGA', 'keezer', 3),
(1, 3, 'Events', 'framer', 2),
(1, 5, 'Majors', 'benmaster', 5),
(2, 6, 'Sports', 'benny', 6),
(1, 4, 'SGA', 'benny', 6);

DROP PROCEDURE IF EXISTS cat_test;
DELIMITER $$
CREATE PROCEDURE cat_test(IN cat_name VARCHAR(40))
   BEGIN
	select fname, lname, user_email 
	from users 
	where user_id in (select user_id from usergroup where category_name like cat_name);
   END
$$
DELIMITER ;

select * from usergroup;
select * from message where msg_text LIKE '%Frogs%';
select msg_text, username from message m, users u where category_id = 6 and u.user_id = 5 and u.user_id = m.user_id;
select msg_text, user_id from message where category_id = 6;
select * from message; 
select * from admin_user;
select * from categories;
SET FOREIGN_KEY_CHECKS=1;
update categories set admin_id = 6 where category_id = 2;
update message set category_id = 6 where category_id = 7;
update users set user_type = 'Student' where username = 'benny';
update usergroup s, categories set s.category_id = categories.category_id where s.category_name like categories.category_name;
select fname, lname, user_email from users where user_id in (select user_id from usergroup where category_name like 'Sports');

CALL cat_test('Majors');
