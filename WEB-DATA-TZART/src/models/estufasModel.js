var database = require("../database/config");

function buscarEstufasPorEmpresa(token) {

    var instrucaoSql = `SELECT * FROM estufa WHERE fk_empresa = ${token}`;

  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

function listar(){
    var instrucao = `
        SELECT * FROM estufa;
        `;
        console.log("Executando" + instrucao);

        return database.executar(instrucao);
}

function cadastrar(nome){
    var instrucao = `
    INSERT INTO estufa (nome) VALUES ('${nome}');
    `;
    console.log("Executando" + instrucao);

    return database.executar(instrucao);

}

module.exports = {
    cadastrar,
    listar,
    buscarEstufasPorEmpresa
};