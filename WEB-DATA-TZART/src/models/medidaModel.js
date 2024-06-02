var database = require("../database/config");

function ranking() {

  var instrucaoSql = `SELECT u.nome AS nome_usuario, qr.qtd_acertos AS pontuacao
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
function graficoBarra() {

  var instrucaoSql = `
    SELECT
        CASE
          WHEN qtd_acertos <= 2 THEN '1-2 PONTOS'
          WHEN qtd_acertos BETWEEN 3 AND 4 THEN '3-4 PONTOS'
          WHEN qtd_acertos BETWEEN 5 AND 6 THEN '5-6 PONTOS'
          WHEN qtd_acertos BETWEEN 7 AND 8 THEN '7-8 PONTOS'
          ELSE '9-10 PONTOS'
        END AS pontos,
        COUNT(*) AS total_usuarios
      FROM quiz_resultado
      GROUP BY CASE
      WHEN qtd_acertos <= 2 THEN '1-2 PONTOS'
      WHEN qtd_acertos BETWEEN 3 AND 4 THEN '3-4 PONTOS'
      WHEN qtd_acertos BETWEEN 5 AND 6 THEN '5-6 PONTOS'
      WHEN qtd_acertos BETWEEN 7 AND 8 THEN '7-8 PONTOS'
      ELSE '9-10 PONTOS'
          END;
     
    `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimasMedidas,
  ranking,
  graficoBarra
}