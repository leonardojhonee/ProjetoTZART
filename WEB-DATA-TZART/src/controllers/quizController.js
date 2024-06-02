var quizModel = require("../models/quizModel");


function cadastrarRespostas(req, res) {
    
    var resposta1 = req.body.resposta1Server;
    var resposta2 = req.body.resposta2Server;
    var resposta3 = req.body.resposta3Server;
    var resposta4 = req.body.resposta4Server;
    var resposta5 = req.body.resposta5Server;
    var resposta6 = req.body.resposta6Server;
    var resposta7 = req.body.resposta7Server;
    var resposta8 = req.body.resposta8Server;
    var resposta9 = req.body.resposta9Server;
    var resposta10 = req.body.resposta10Server;
    var email = req.body.emailUsuarioServer;
    var acertos = req.body.acertosServer;
    

    quizModel.cadastrarRespostas(resposta1, resposta2, resposta3, resposta4, resposta5, resposta6, resposta7, resposta8, resposta9, resposta10, email, acertos).then(
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
