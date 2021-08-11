CREATE TABLE users (
  rowid int(10) unsigned not null auto_increment,
  active bit(1) not null default 1,
  user_name varchar(250) not null,
  fname varchar(100) not null,
  lname varchar(100) not null,
  dob datetime not null,
  password varchar(250) not null,
  email varchar(250) not null,
  bio varchar(250) not null
  primary key(rowid)
)

CREATE TABLE post(
  rowid int(10) not null auto_increment,
  caption varchar(250) null,
  image varchar(250) not null,
  FOREIGN KEY (user_id) REFERENCES user(rowid),
  PRIMARY KEY(rowid)
)

CREATE TABLE post_like(
 post_id int(10) unsigned not null,
 FOREIGN KEY (post_id) REFERENCES post(rowid),
 user_id int(10) unsigned not null,
 FOREIGN KEY (user_id) REFERENCES user(rowid)
)

CREATE TABLE message (
  rowid int(10) not null auto_increment,
  active bit(1) default 1 not null,
  created_dt datetime  default current_timestamp(),
  to_userid int(10) unsigned not null, 
  from_userid int(10) unsigned not null,
  message varchar(250) not null,
  FOREIGN KEY (to_userid) REFERENCES user(rowid),
  FOREIGN KEY (from_userid) REFERENCES user(rowid),
  primary key(rowid)
)