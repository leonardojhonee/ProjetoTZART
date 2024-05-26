var quizModel = require("../models/quizModel");


function cadastrarRespostas(req, res) {
    
    var quest1 = req.body.resposta1Server;
    var quest2 = req.body.resposta2Server;
    var quest3 = req.body.resposta3Server;
    var quest4 = req.body.resposta4Server;
    var quest5 = req.body.resposta5Server;
    var quest6 = req.body.resposta6Server;
    var quest7 = req.body.resposta7Server;
    var quest8 = req.body.resposta8Server;
    var quest9 = req.body.resposta9Server;
    var quest10 = req.body.resposta10Server;
    var email = req.body.emailUsuarioServer;
    var acertos = req.body.acertosServer;
    var tempoGasto = req.body.tempoGastoServer;
    var pontuacaoTotal = req.body.pontuacaoTotalServer;

    // Faça as validações dos valores

    quizModel.cadastrarRespostas(quest1, quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9, quest10, email, acertos, tempoGasto, pontuacaoTotal).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro das respostas! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}


module.exports = {
    cadastrarRespostas,
 
};
