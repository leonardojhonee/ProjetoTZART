var database = require("../database/config");

function cadastrarRespostas(quest1, quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9, quest10,email, acertos, tempoGasto, pontuacaoTotal) {

    var instrucaoSql = `
    INSERT INTO quiz_resultado (fk_user, quest1, quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9, quest10, qtd_acertos, data_hora, tempo_gasto, pontuacao_total )
    VALUES ((SELECT id FROM usuario WHERE email = '${email}'),'${quest1}', '${quest2}', '${quest3}', '${quest4}', '${quest5}', '${quest6}', '${quest7}', '${quest8}', '${quest9}', '${quest10}', '${acertos}', NOW(), '${tempoGasto}', '${pontuacaoTotal}');`;
    console.log("Executando a instrução SQL de atualização do resultado do quiz: \n" + instrucaoSql);

    return database.executar(instrucaoSql);

}

module.exports = {
    cadastrarRespostas
};

