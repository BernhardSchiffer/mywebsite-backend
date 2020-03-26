create table messages(
	id serial not null,
	topic varchar(255) not null,
    useremail varchar(255) not null,
	username varchar(255) not null,
	message text not null,
	primary key (id)
);