
create table books(
    id int not null auto_increment primary key,
    isbn VARCHAR(20) not null,
    openid VARCHAR(50) not null,
    title VARCHAR(100) not null,
    image VARCHAR(100),
    alt VARCHAR(100) not null,
    publisher VARCHAR(100) not null,
    summary VARCHAR(1000) NOT null,
    price VARCHAR(100),
    rate FLOAT,
    tags VARCHAR(100),
    author VARCHAR(100)
);

create table comments(
    id int not null auto_increment primary key,
    openid VARCHAR(100) not null,
    bookid VARCHAR(10) not null,
    comment VARCHAR(200) not null,
    phone VARCHAR(50),
    location VARCHAR(50)
)