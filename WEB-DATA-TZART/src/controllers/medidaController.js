var medidaModel = require("../models/medidaModel");

function ranking(req, res) {
    medidaModel.ranking()
        .then((resultado) => {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);
            res.status(200).json(resultado);
        })
        .catch((error) => {
            console.error("Erro ao obter dados de ranking:", error);
            res.status(500).json({ error: "Erro ao obter dados de ranking" });
        });
}
function graficoBarra(req, res) {
    medidaModel.graficoBarra()
        .then((resultado) => {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);
            res.status(200).json(resultado);
        })
        .catch((error) => {
            console.error("Erro ao obter dados de ranking:", error);
            res.status(500).json({ error: "Erro ao obter dados de ranking" });
        });
}


function buscarUltimasMedidas(req, res) {

    const limite_linhas = 4;

   
    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(email, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarUltimasMedidas,
    ranking, 
    graficoBarra
}