CREATE TABLE users (
  rowid int(10) unsigned not null auto_increment,
  active bit(1) not null default 1,
  user_name varchar(250) not null,
  fname varchar(100) not null,
  lname varchar(100) not null,
  dob datetime not null,
  pswd varchar(250) not null,
  primary key(rowid)
)
