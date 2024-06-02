

function proximaPergunta(proxima) {
    const perguntas = document.querySelectorAll('.div-quiz');
    const perguntaAtual = perguntas[proxima - 1];
    const respostaSelecionada = document.querySelector(`input[name="resposta${proxima - 1}"]:checked`).value;

    for (var contador = 0; contador < perguntas.length; contador += 1) {

        if (contador + 1 == proxima) {
            perguntas[contador].style.display = 'block';
        } else {
            perguntas[contador].style.display = 'none';
        }
    }
}


function enviarRespostas() {

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

        }),
    })
        .then(function (resposta) {
            console.log("Resposta do servidor: ", resposta);

            if (resposta.ok) {

                calcularKPIs()

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

    let respostasCorretasPlayer = 0;

    for (let contador = 0; contador <= 9; contador++) {

        let resposta = document.querySelector('input[name="resposta' + (contador + 1) + '"]:checked');
        if (resposta) {
            resposta = resposta.value;

            if (resposta == "1") {

                respostasCorretasPlayer++;
            }
        }
    }

    sessionStorage.RESPOSTA_CORRETA = respostasCorretasPlayer;

    console.log('Total de Acertos:' + respostasCorretasPlayer);

}

