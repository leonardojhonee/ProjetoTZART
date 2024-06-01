var database = require("../database/config");

function ranking() {

    var instrucaoSql = `SELECT u.nome AS nome_usuario, qr.pontuacao_total AS pontuacao
    FROM quiz_resultado qr
    JOIN (
      SELECT fk_user, MAX(data_hora) AS ultima_resposta
      FROM quiz_resultado
      GROUP BY fk_user
    ) ultima ON qr.fk_user = ultima.fk_user AND qr.data_hora = ultima.ultima_resposta
    JOIN usuario u ON qr.fk_user = u.id;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidas(email, limite_linhas) {

    var instrucaoSql = `SELECT idTentativa, qtd_acertos FROM quiz_resultado WHERE fk_user = (SELECT id FROM usuario WHERE email = '${email}') ORDER BY id DESC LIMIT '${limite_linhas}';`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function graficoPizza() {

    var instrucaoSql = `SELECT
   
    COUNT(*) AS total_usuarios
  FROM quiz_resultado
  GROUP BY CASE
        WHEN qtd_acertos <= 2 THEN 'Até 2 pontos'
      WHEN qtd_acertos BETWEEN 3 AND 4 THEN 'De 3 a 4 pontos'
      WHEN qtd_acertos BETWEEN 5 AND 6 THEN 'De 5 a 6 pontos'
      WHEN qtd_acertos BETWEEN 7 AND 8 THEN 'De 7 a 8 pontos'
      ELSE 'De 9 pra cima'
      END;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    ranking,
    graficoPizza
}