var database = require("../database/config");

function ranking() {

    var instrucaoSql = `SELECT u.nome AS nome_usuario, qr.pontuacao_total AS pontuacao, qr.tempo_gasto
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
function mediaAcertos() {

    var instrucaoSql = `SELECT 
    AVG(CAST(qtd_acertos AS DECIMAL(4,2))) AS media_acertos_total, 
    AVG(CAST( pontuacao_total AS DECIMAL(4,2))) AS media_pontuacao_total,
    TIME_FORMAT(SEC_TO_TIME(ROUND(AVG(SUBSTRING_INDEX(tempo_gasto, ':', 1) * 60 + SUBSTRING_INDEX(tempo_gasto, ':', -1)))), '%i:%s')  AS media_tempo_gasto
FROM 
    quiz_resultado;`;

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
    CASE
      WHEN pontuacao_total <= 12 THEN 'Até 12 pontos'
      WHEN pontuacao_total BETWEEN 15 AND 21 THEN 'De 15 a 21 pontos'
      ELSE 'Mais de 24 pontos'
    END AS faixa,
    COUNT(*) AS total_usuarios
  FROM quiz_resultado
  GROUP BY CASE
        WHEN pontuacao_total <= 12 THEN 'Até 12 pontos'
        WHEN pontuacao_total BETWEEN 15 AND 21 THEN 'De 15 a 21 pontos'
        ELSE 'Mais de 24 pontos'
      END;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    ranking,
    mediaAcertos,
    graficoPizza
}