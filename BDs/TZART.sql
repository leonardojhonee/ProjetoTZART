CREATE DATABASE tzart;

USE tzart;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(100),
    senha VARCHAR(50)
); 

CREATE TABLE quiz_resultado (
    idTentativa INT PRIMARY KEY AUTO_INCREMENT,
    fk_user int,
    quest1 VARCHAR(50),
    quest2 VARCHAR(50),
    quest3 VARCHAR(50),
    quest4 VARCHAR(50),
    quest5 VARCHAR(50),
    quest6 VARCHAR(50),
    quest7 VARCHAR(50),
    quest8 VARCHAR(50),
    quest9 VARCHAR(50),
    quest10 VARCHAR(60),
    qtd_acertos varchar(20),
    data_hora DATETIME,
    tempo_gasto varchar(40),
    pontuacao_total varchar(40),
    foreign key (fk_user) references usuario (id)
);


select * from quiz_resultado;
select * from usuario;


insert into usuario(nome, email, senha)
values ('Leonardo', 'leonardo@gmail.com', 'leonardo123?');
 
