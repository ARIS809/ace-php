CREATE TABLE users (
    rowid int(10) unsigned not null auto_increment,
    user_name varchar(250) not null,
    fname varchar(100) not null,
    lname varchar(100) not null,
    dob datetime not null,
    password varchar(250) not null
    primary key(rowid)

)