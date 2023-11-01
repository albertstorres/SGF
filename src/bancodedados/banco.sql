drop table if exists usuarios;

drop table if exists feiras;

drop table if exists clientes;

drop table if exists locacoes;

drop table if exists bancos;

drop table if exists naoPago;

create table usuarios (
	id serial primary key,
  username text not null unique,
  nome text not null,
  senha text not null
);

create table feiras (
	id serial primary key,
  nome text not null unique
);

create table clientes (
	id serial primary key,
  nome text not null,
  cpf text not null unique,
  cep text,
  rua text,
  bairro text,
  numero text,
  cidade text,
  estado char(2),
  feiras_id int not null,
  foreign key (feiras_id) references feiras (id)
);

create table locacoes (
	id serial primary key,
  data timestamptz default now(),
  situacao boolean not null
);

create table bancos (
	id serial primary key,
  nome text not null unique,
  feiras_id int not null,
  clientes_id int not null,
  locacoes_id int 
);

create table naopago (
	id serial primary key,
  data timestamptz default now(),
  foto text not null,
  bancos_id int not null,
  locacoes_id int not null,
  foreign key (bancos_id) references bancos (id),
  foreign key (locacoes_id) references locacoes (id)
);

create table pago (
	id serial primary key,
  data timestamptz default now(),
  bancos_id int not null,
  locacoes_id int not null,
  foreign key (bancos_id) references bancos (id),
  foreign key (locacoes_id) references locacoes (id)
);
