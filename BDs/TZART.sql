create database tzart;

use tzart;

create table user_art (
    id int primary key auto_increment,
    nome varchar(50),
    email varchar(50),
    senha varchar(50)
);

create table quiz_art (
    idtentativa int primary key auto_increment,
    fk_user int,
    resposta1 int,
    resposta2 int,
    resposta3 int,
    resposta4 int,
    resposta5 int,
    resposta6 int,
    resposta7 int,
    resposta8 int,
    resposta9 int,
    resposta10 int,
    qtd_acertos int,
    data_hora datetime,
    foreign key (fk_user) references user_art (id)
);



select * from quiz_art;
select * from user_art;


insert into user_art(nome, email, senha)
values ('Leonardo', 'leonardo@gmail.com', 'leonardo123!');

