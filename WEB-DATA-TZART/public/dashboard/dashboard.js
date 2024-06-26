
window.onload = function () {
    listar()
    obterDadosGrafico();
};
setInterval(listar, 5000)

const ranking = [];
function listar() {
    fetch("/medidas/ranking", {
        method: "GET",
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Erro ao buscar ranking');
            }
            return resposta.json();
        })
        .then((ranking) => {
            console.log('sucesso:', ranking);
            preencherRanking(ranking);
        })
        .catch(function (erro) {
            console.error(`#ERRO: ${erro.message}`);
        });
}


function preencherRanking(ranking) {

    ranking.sort((a, b) => b.pontuacao - a.pontuacao);

    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = '';

    ranking.forEach((resultado, indice) => {
        const valorLinha = document.createElement('div');
        valorLinha.classList.add('linha');
        valorLinha.innerHTML = `
        <div class="item">${indice + 1}º</div>
        <div class="item">${resultado.nome_usuario}</div>
        <div class="item">${resultado.pontuacao} pontos</div>
    `;
        corpoTabela.innerHTML += valorLinha.outerHTML;
    });
}


function obterDadosGrafico() {

    fetch(`/medidas/graficoBarra`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);

            });
        } else {
            console.error('Falha ao buscar dados');
        }
    })
        .catch(function (error) {
            console.error(`Erro ao buscar dados para o grafico: ${error.message}`);
        });
}


function plotarGrafico(resposta) {

    console.log('Plotando grafico...');

    let labels = [];


    /*GRAFICO DE BARRAS*/

    let dados = {
        labels: labels,
        datasets: [{
            label: 'QTD-USUARIOS',
            data: [],
            fill: false,
            backgroundColor: [
                'rgba(234, 99, 255, 0.2)',
                'rgba(130, 54, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 86, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'pink',
                'magenta',
                'rgba(255, 206, 86, 1)',
                'red',
                'rgba(153, 102, 255, 1)'

            ],
            borderWidth: 1,
            tension: 0.1
        }]
    };

    /* FIM GRAFICO DE BARRAS*/

    /*GRAFICO PIZZA*/

    let dados2 = {
        labels: labels,
        datasets: [{
            label: 'QTD-USUARIOS',
            data: [],
            fill: false,
            backgroundColor: [
                'rgba(234, 99, 255, 0.2)',
                'rgba(130, 54, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 86, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'pink',
                'magenta',
                'rgba(255, 206, 86, 1)',
                'red',
                'rgba(153, 102, 255, 1)'

            ],
            borderWidth: 1,

        }]
    };

    /*FIM GRAFICO PIZZA*/

    console.log('----------------------------------------------')
    console.log('Dados recebidos "obterDadosGrafico" e utilizados "plotarGrafico":')
    console.log(resposta)


    for (contador = 0; contador < resposta.length; contador++) {
        var registro = resposta[contador];
        labels.push(registro.pontos);
        dados.datasets[0].data.push(registro.total_usuarios);
        dados2.datasets[0].data.push(registro.total_usuarios);

    }


    console.log('----------------------------------------------')
    console.log('Plotagem de dados:')
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    /*CONFIG GRAFICO DE BARRAS*/
    const config = {
        type: 'bar',
        data: dados,
        responsive: true,
        options: {
            scales: {
                y: {
                    
                    beginAtZero: true,
                    
                }
            }
        }
    };

    /*CONFIG GRAFICO DE PIZZA*/
    const config2 = {
        type: 'pie',
        data: dados2,
        responsive: false,
        options: {
            scales: {

            }
        }
    };


    /*CONFIG GRAFICO DE BARRAS*/
    let myChart = new Chart(
        document.getElementById(`myChart`),
        config
    );
    
    /*CONFIG GRAFICO DE PIZZA*/
    let myChart2 = new Chart(
        document.getElementById(`myChart2`),
        config2
    );


}


