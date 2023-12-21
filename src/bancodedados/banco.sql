drop table if exists usuarios;

drop table if exists feiras;

drop table if exists clientes;

drop table if exists locacoes;

drop table if exists bancos;

drop table if exists naoPago;

drop table if exists cobrar;

drop table if exists situacao;

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
  foreign key (feiras_id) references feiras (id),
  foreign key (clientes_id) references clientes (id)
);

create table naopago (
	id serial primary key,
  data timestamptz default now(),
  foto text not null unique,
  bancos_id int not null,
  locacoes_id int not null,
  feiras_id int not null,
  foreign key (bancos_id) references bancos (id),
  foreign key (locacoes_id) references locacoes (id),
  foreign key (feiras_id) references feiras (id)
);

create table pago (
	id serial primary key,
  data timestamptz default now(),
  bancos_id int not null,
  locacoes_id int not null,
  feiras_id int not null,
  foreign key (bancos_id) references bancos (id),
  foreign key (locacoes_id) references locacoes (id),
  foreign key (feiras_id) references feiras (id)
);

create table situacao (
	id serial primary key,
  bancos_id int not null,
  pago_id int,
  naopago_id int,
  feiras_id int not null,
  foreign key (pago_id) references pago (id),
  foreign key (naopago_id) references naopago (id),
  foreign key (bancos_id) references bancos (id),
  foreign key (feiras) references feiras (id)
);

create table cobrar (
	id serial primary key,
  locacoes_id int not null,
  feiras_id int not null,
  usuarios_id int not null,
  bancos_id int not null,
  situacao_id int not null,
  data timestamptz default now(),
  status text not null,
  foreign key (locacoes_id) references locacoes (id),
  foreign key (feiras_id) references feiras (id),
  foreign key (usuarios_id) references usuarios (id),
  foreign key (bancos_id) references bancos (id),
  foreign key (situacao_id) references situacao (id)
);



