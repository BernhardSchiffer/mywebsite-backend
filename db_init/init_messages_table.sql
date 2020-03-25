create table messages(
	id serial not null,
	topic varchar(255) not null,
    useremail varchar(255) not null,
	userName varchar(255) not null,
	question text not null,
	primary key (id)
);