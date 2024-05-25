var estufasModel = require("../models/estufasModel");

function buscarEstufasPorEmpresa(req, res) {
    var id = req.params.id;
  
    estufasModel.buscarEstufasPorEmpresa(id).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as estufas: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }  
  

function listar(req, res) {
    estufasModel.listar().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}


function cadastrar(req, res) {
    var nome = req.body.nome;

    if(nome == undefined){
        res.status(400).send("Seu nome está undefined.")
    }

    estufasModel.cadastrar(nome).then(function (resposta) {
        res.status(200).send("Estufa Criada com Sucesso.");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

module.exports = {
    listar, 
    cadastrar,
    buscarEstufasPorEmpresa
}