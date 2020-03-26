create table users(
	id serial not null,
    email varchar(255) unique not null,
	name varchar(255) not null,
    hash text not null,
	roles text[] not null,
	primary key (id)
);