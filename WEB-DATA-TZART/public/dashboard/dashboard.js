let proximaAtualizacao;
window.onload = function () {
    listar();
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

