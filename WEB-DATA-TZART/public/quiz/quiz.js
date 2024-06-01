



let mensagemExibida = false;
/*utilizei o metodo de argumento na funcao vinda do onclick*/
function proximaPergunta(proxima) {
    const perguntas = document.querySelectorAll('.div-quiz');
    const perguntaAtual = perguntas[proxima - 1];
    let todasRespondidas = true; // Variável para verificar se todas as perguntas anteriores foram respondidas


    for (var contador = 0; contador < proxima - 1; contador += 1) {
        let resposta = document.querySelector('input[name="resposta' + (contador + 1) + '"]:checked');
        if (!resposta) {
            mostrarMensagem()
            setTimeout(() => {
                ocultarMensagem();

            }, 3000);
            todasRespondidas = false;
            return false;
        }
    }


    if (!todasRespondidas) {
        mostrarMensagem()
        setTimeout(() => {
            ocultarMensagem();
        }, 3000);
        return false; // Interrompe a execução da função
    }


        // Obtém o valor da resposta selecionada
        const respostaSelecionada = document.querySelector(`input[name="resposta${proxima -1}"]:checked`).value;

       
    
    // Se todas as respostas estiverem checadas, mostrar a pergunta correta
    for (var contador = 0; contador < perguntas.length; contador += 1) {

        if (contador + 1 == proxima) {
            perguntas[contador].style.display = 'block';
        } else {
            perguntas[contador].style.display = 'none';
        }
    }
}


function enviarRespostas() {
    
 
    /*Obtem os valores selecionados, que serão enviados para o banco*/
    const resposta1 = document.querySelector('input[name="resposta1"]:checked').value;
    const resposta2 = document.querySelector('input[name="resposta2"]:checked').value;
    const resposta3 = document.querySelector('input[name="resposta3"]:checked').value;
    const resposta4 = document.querySelector('input[name="resposta4"]:checked').value;
    const resposta5 = document.querySelector('input[name="resposta5"]:checked').value;
    const resposta6 = document.querySelector('input[name="resposta6"]:checked').value;
    const resposta7 = document.querySelector('input[name="resposta7"]:checked').value;
    const resposta8 = document.querySelector('input[name="resposta8"]:checked').value;
    const resposta9 = document.querySelector('input[name="resposta9"]:checked').value;
    const resposta10 = document.querySelector('input[name="resposta10"]:checked').value;
    // armazenando para exibir as respostas 
    let respostasRespondidas = [resposta1, resposta2, resposta3, resposta4, resposta5, resposta6, resposta7, resposta8, resposta9, resposta10];
    sessionStorage.QUESTOES_RESPONDIDAS = respostasRespondidas

    console.log(resposta1, resposta2, resposta3, resposta4, resposta5, resposta6, resposta7, resposta8, resposta9, resposta10)
    calcularKPIs()
  
    

    console.log('Email do usuário:', sessionStorage.EMAIL_USUARIO2);

    fetch("/quiz/cadastrarRespostas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            resposta1Server: resposta1,
            resposta2Server: resposta2,
            resposta3Server: resposta3,
            resposta4Server: resposta4,
            resposta5Server: resposta5,
            resposta6Server: resposta6,
            resposta7Server: resposta7,
            resposta8Server: resposta8,
            resposta9Server: resposta9,
            resposta10Server: resposta10,
            acertosServer: sessionStorage.RESPOSTA_CORRETA,
            emailUsuarioServer: sessionStorage.EMAIL_USUARIO2,
            pontuacaoTotalServer: sessionStorage.PONTUACAO_TOTAL
        }),
    })
        .then(function (resposta) {
            console.log("Resposta do servidor: ", resposta);

            if (resposta.ok) {
                // alert("Respostas enviadas com sucesso!");
                calcularKPIs()
                // let redirecionarDash = "../dashboard/dashboard.html";
                // window.location.href = redirecionarDash;
                const section_saida = document.getElementById('section_saida')
                const section_quiz = document.getElementById('section_quiz')

                section_saida.style.display = "block";
                section_quiz.style.display = "none";

                resultadosQuiz.innerHTML = `
                Quantidade acertos: <b>${sessionStorage.RESPOSTA_CORRETA}/10</b><br><br>
               
                Confira o gabarito:<br>
               
                `
            } else {
                throw "Houve um erro ao tentar realizar o cadastro das respostas!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            alert("Ocorreu um erro ao enviar as respostas. Por favor, tente novamente mais tarde.");
        });
    return false;

}

function calcularKPIs() {

    let pontuacaoTotal = 0;
    let respostasCorretasPlayer = 0;

    /*For que intera um valor para cada pergunta*/
    for (let contador = 0; contador <= 9; contador++) {

        let resposta = document.querySelector('input[name="resposta' + (contador + 1) + '"]:checked');
        // Verificar se uma resposta foi selecionada e em seguida pega o valor
        if (resposta) {
            resposta = resposta.value;

            if (resposta == "1") {
                pontuacaoTotal += 3;
                respostasCorretasPlayer++;
            }
        }
    }
    let desacertos = 10 - respostasCorretasPlayer;
    let aproveitamento = (pontuacaoTotal / 100) * 100
    sessionStorage.DESACERTOS = desacertos;
    sessionStorage.APROVEITAMENTO = aproveitamento;
    sessionStorage.RESPOSTA_CORRETA = respostasCorretasPlayer;
    sessionStorage.PONTUACAO_TOTAL = pontuacaoTotal;

    console.log('Pontuação Total:' + pontuacaoTotal);
    console.log('Total de Acertos:' + respostasCorretasPlayer);

}

