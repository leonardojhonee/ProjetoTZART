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
    resposta1 VARCHAR(50),
    resposta2 VARCHAR(50),
    resposta3 VARCHAR(50),
    resposta4 VARCHAR(50),
    resposta5 VARCHAR(50),
    resposta6 VARCHAR(50),
    resposta7 VARCHAR(50),
    resposta8 VARCHAR(50),
    resposta9 VARCHAR(50),
    resposta10 VARCHAR(60),
    qtd_acertos varchar(20),
    data_hora DATETIME,
    foreign key (fk_user) references usuario (id)
);


select * from quiz_resultado;
select * from usuario;


insert into usuario(nome, email, senha)
values ('Leonardo', 'leonardo@gmail.com', 'leonardo123!');