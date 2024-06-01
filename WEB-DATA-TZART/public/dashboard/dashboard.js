let proximaAtualizacao;
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
                throw new Error('Erro ao recuperar o ranking');
            }
            return resposta.json();
        })
        .then((ranking) => {
            console.log('Dados do ranking recebidos com sucesso:', ranking);
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
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }
    fetch(`/medidas/graficoPizza`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function plotarGrafico(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: ['1-2', '3-4', '5-6', '7-8', '9-10'],
        datasets: [{
            label: 'QTD_PESSOAS',
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
            borderWidth: 1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.datasets[0].data.push(registro.total_usuarios);


    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config  labels.push(registro.total_usuarios);
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

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChart`),
        config
    );

    setTimeout(() => atualizarGrafico(dados, myChart), 2000);
}
function atualizarGrafico(dados, myChart) {

fetch(`/medidas/tempo-real`, { cache: 'no-store' }).then(function (response) {
if (response.ok) {
    response.json().then(function (novoRegistro) {

        
        // alertar(novoRegistro, idAquario);
        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dados);

        


        if (novoRegistro[0].total_usuarios == dados.labels[dados.labels.length - 1]) {
            console.log("---------------------------------------------------------------")
            console.log("Como não há dados novos para captura, o gráfico não atualizará.")
            
            console.log("Horário do novo dado capturado:")
            console.log(novoRegistro[0].total_usuarios)
            console.log("Horário do último dado capturado:")
            console.log(dados.labels[dados.labels.length - 1])
            console.log("---------------------------------------------------------------")
        } else {
            // tirando e colocando valores no gráfico
            dados.labels.shift(); // apagar o primeiro
            dados.labels.push(novoRegistro[0].total_usuarios); // incluir um novo momento
            
            dados.datasets[0].data.shift();  // apagar o primeiro de umidade
            dados.datasets[0].data.push(novoRegistro[0].total_usuarios); // incluir uma nova medida de umidade

         

            myChart.update();
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarGrafico( dados, myChart), 2000);
    });
} else {
    console.error('Nenhum dado encontrado ou erro na API');
    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
    proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
}
})
.catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
});

}

