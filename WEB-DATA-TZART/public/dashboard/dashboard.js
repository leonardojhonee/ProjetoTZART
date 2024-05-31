let proximaAtualizacao;
window.onload = function () {
    obterDadosGrafico()
    listar();
    mediaAcertos();
};
// Atualiza os valores a cada 1 minutos
setInterval(listar, 5000)
setInterval(mediaAcertos, 5000);

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
// função para preencher o ranking
function preencherRanking(ranking) {
    //reordena do maior para o menor (sort() = ornagina os elementos do arraw conforme a função dada)
    ranking.sort((a, b) => b.pontuacao - a.pontuacao);

    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = '';

    //forEach() é usado para iterar sobre cada entrada no ranking ordenado
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

function exibirValoresKPIs() {
    console.log('Certas:', sessionStorage.RESPOSTA_CORRETA);
    console.log('Total:', sessionStorage.PONTUACAO_TOTAL);
    console.log('Erros:', sessionStorage.DESACERTOS)
    console.log('Aproveitamento:', sessionStorage.APROVEITAMENTO)
}


function mediaAcertos() {
    fetch("/medidas/mediaAcertos", {
        method: "GET",
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Erro ao recuperar o ranking');
            }
            return resposta.json();
        })
        .then((mediaAcertos) => {
            let mediaAcertosTotal = "Média não disponível";
           
            if (mediaAcertos.length > 0) {
                const media = parseFloat(mediaAcertos[0].media_acertos_total);
              

                if (!isNaN(media)) {
                    mediaAcertosTotal = Math.ceil(media);
                   
                }
                console.log("MEdia 3", media3)
            }

            document.getElementById('divMediaAcertos').innerHTML = `${mediaAcertosTotal}<strong><span style="font-size: 20px;"> questões</span></strong>`;
            
        })
        .catch(function (erro) {
            console.error(`#ERRO: ${erro.message}`);
            document.getElementById('divMediaAcertos').innerText = "Erro ao obter a média";
        });
}

function preencherMediaAcertos(mediaAcertos) {
    const divMediaAcertos = document.getElementById('divMediaAcertos');
    if (divMediaAcertos) {
        divMediaAcertos.style.display = "block";
        if (mediaAcertos.length > 0) {
            const media = mediaAcertos[0].media_acertos_total;
            if (media !== undefined) {
                divMediaAcertos.innerText = `Média: ${media}`;
            } else {
                divMediaAcertos.innerText = "Média não disponível.";
            }
        } else {
            divMediaAcertos.innerText = "Nenhum dado disponível.";
        }
    } else {
        console.error("Div não encontrada para preencher a média de acertos.");
    }
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
        labels: labels,
        datasets: [{
            label: 'Usuários',
            data: [],
            fill: false,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(0, 128, 128)'
            ],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.faixa);
        dados.datasets[0].data.push(registro.total_usuarios);


    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'pie',
        data: dados,
        responsive: true,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    
                        fontColor: '#fffff' // Cor do texto dos rótulos da legenda
    
                },
            }
        },
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChartCanvas`),
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

        


        if (novoRegistro[0].faixa == dados.labels[dados.labels.length - 1]) {
            console.log("---------------------------------------------------------------")
            console.log("Como não há dados novos para captura, o gráfico não atualizará.")
            
            console.log("Horário do novo dado capturado:")
            console.log(novoRegistro[0].faixa)
            console.log("Horário do último dado capturado:")
            console.log(dados.labels[dados.labels.length - 1])
            console.log("---------------------------------------------------------------")
        } else {
            // tirando e colocando valores no gráfico
            dados.labels.shift(); // apagar o primeiro
            dados.labels.push(novoRegistro[0].faixa); // incluir um novo momento

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