create database ecommercedb2;

use ecommercedb2;

create table user (
id int auto_increment,
email varchar(255),
password varchar(255),
role varchar(255),
primary key(id)
);

INSERT INTO `ecommercedb2`.`user` (`email`, `password`, `role`) VALUES ('admin@gmail.com', 'adminPass', 'admin');