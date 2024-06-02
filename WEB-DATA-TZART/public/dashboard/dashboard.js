
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

    let dados = {
        labels: labels,
        datasets: [{
            label: 'QTD-USUARIOS' ,
            data: [],
            fill: false,
            backgroundColor: [
                'rgba(234, 99, 255, 0.2)',
                    'rgba(130, 54, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 86, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
            ],
            borderColor:[
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

    console.log('----------------------------------------------')
    console.log('Dados recebidos "obterDadosGrafico" e utilizados "plotarGrafico":')
    console.log(resposta)

 
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.pontos);
        dados.datasets[0].data.push(registro.total_usuarios);


    }

    console.log('----------------------------------------------')
    console.log('Plotagem de dados:')
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

   
    const config = {
        type: 'bar',
        data: dados,
        responsive: true,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };


    let myChart = new Chart(
        document.getElementById(`myChart`),
        config
    );

   
}
