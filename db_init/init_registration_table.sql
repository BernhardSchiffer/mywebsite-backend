create table registrations(
	id serial not null,
	registrationTime timestamp not null,
	firstname varchar(255) not null,
   	lastname varchar(255) not null,
   	birthday date not null,
	telefon varchar(255) not null,
   	email varchar(255) not null,
   	address varchar(255) not null,
   	postcode smallint not null,
   	city varchar(255) not null,
   	medicine text,
   	insurant varchar(255) not null,
   	insurance varchar(255) not null,
   	canSwim boolean,
   	VegetarianOrVegan varchar(10),
   	misc text,
   	passengersArrival smallint not null,
   	passengersDeparture smallint not null,
	primary key (id)
);