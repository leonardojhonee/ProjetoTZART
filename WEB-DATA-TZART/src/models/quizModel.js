var database = require("../database/config");

function cadastrarRespostas(resposta1, resposta2, resposta3, resposta4, resposta5,
    resposta6, resposta7, resposta8, resposta9, resposta10, email, acertos) {

    var instrucaoSql = `
        INSERT INTO quiz_resultado (fk_user, resposta1, resposta2, resposta3, resposta4, resposta5, resposta6, resposta7, resposta8, resposta9, resposta10, qtd_acertos, data_hora )
        VALUES ((SELECT id FROM usuario WHERE email = '${email}'),'${resposta1}', '${resposta2}', '${resposta3}', '${resposta4}', '${resposta5}', '${resposta6}', '${resposta7}', '${resposta8}', '${resposta9}', '${resposta10}', '${acertos}', NOW());`;
    console.log("Executando a instrução SQL de atualização do resultado do quiz: \n" + instrucaoSql);


    return database.executar(instrucaoSql);

}

module.exports = {
    cadastrarRespostas
};

