let pos = 0
imagem = document.querySelector('#spec-img')

document.querySelector('#arrow-right').addEventListener('click', right)
document.querySelector('#arrow-left').addEventListener('click', left)

function changeImg(){
    if (pos === 0){
        imagem.src = "_imagens/tela.jpg"
    } else if (pos === 1){
        imagem.src = "_imagens/camera.jpg"
    } else if (pos === 2){
        imagem.src = "_imagens/baterias.jpg"
    } else {
        imagem.src = "_imagens/sensores.jpg"
    }
}

function left(){
    owl = $('.owl-carousel')
    if (pos === 0){
        pos = 0
    } else {
        pos -= 1
    }
    owl.trigger('prev.owl.carousel')
    return changeImg()
}

function right(){
    owl = $('.owl-carousel')
    if (pos === 3){
        pos = 3
    } else {
        pos += 1
    }
    owl.trigger('next.owl.carousel')
    return changeImg()
}

function sendMessage(){
    let name = document.querySelector('input#cNome').value;
    let email = document.querySelector('input#cEmail').value;
    let message = document.querySelector('textarea#cMsg').value;
    const regEmail = /(\w|\d)@\w+(.com|.com.br)$/g //EXPRESSAO REGULAR PRA IDENTIFICAR UM ENDEREÇO DE EMAIL VÁLIDO

    /*EMBORA ALGUMAS DESSAS PROPRIEDADES ABAIXO JÁ ESTEJAM DEFINIDAS NA PÁGINA DE ESTILOS
      TENHO QUE DEFINI-LAS AQUI TBM, PORQUE QUANDO O USUARIO CORRIGIR UM ERRO DELE, 
      E CLICAR EM ENVIAR MENSAGEM, MESMO COM OS CAMPOS JÁ PREENCHIDOS, E EMAIL JÁ CORRIGIDO, 
      A BORDA DO INPUT CONTINUARÁ VERMELHA, E A INFORMAÇÃO DE ERRO CONTINUARÁ APARECENDO.
      OU SEJA, DA LINHA 13 A 19 TEMOS UMA GAMBIARRA DE "REFRESH"
    */
    document.querySelector('input#cNome').style.border="1px black solid"
    document.querySelector('p#errorName').style.opacity="0"
    document.querySelector('input#cEmail').style.border="1px black solid"
    document.querySelector('p#errorEmail').style.opacity="0"
    document.querySelector('p#errorEmail').innerHTML = "Preencha o campo e tente novamente."
    document.querySelector('textarea#cMsg').style.border="1px black solid"
    document.querySelector('p#errorMessage').style.opacity="0"

    /*1ª PARTE DA VERIFICAÇÃO (CAMPOS EM BRANCO) */
    if (name.length == 0 || email.length == 0){
        window.alert('CAMPOS OBRIGATÓRIOS NÃO PREENCHIDOS! TENTE NOVAMENTE')
        if (name.length == 0 && email.length == 0){
            document.querySelector('input#cNome').style.border="1px red solid"
            document.querySelector('input#cEmail').style.border="1px red solid"
            document.querySelector('p#errorName').style.opacity="1"
            document.querySelector('p#errorEmail').style.opacity="1"
        } else if (name.length == 0 && email.length != 0){
            document.querySelector('input#cNome').style.border="1px red solid"
            document.querySelector('p#errorName').style.opacity="1"
        } else {
            document.querySelector('input#cEmail').style.border="1px red solid"
            document.querySelector('p#errorEmail').style.opacity="1"
        }

    /*2ª PARTE DA VERIFICAÇÃO (EMAIL VÁLIDO) */
    } else if (regEmail.test(email) == false){
        window.alert('EMAIL INVALIDO! TENTE NOVAMENTE')
        document.querySelector('input#cEmail').style.border="1px red solid"
        document.querySelector('p#errorEmail').innerHTML = "Certifique-se de que não há erros no email informado"
        document.querySelector('p#errorEmail').style.opacity="1"

    /*3ª PARTE DA VERIFICAÇÃO (MENSAGEM EM BRANCO) */
    } else if (message.length == 0){
        window.alert('CAMPO "MENSAGEM" NÃO PREENCHIDO! TENTE NOVAMENTE')
        document.querySelector('textarea#cMsg').style.border="1px red solid"
        document.querySelector('p#errorMessage').style.opacity="1"

    /*SE TIVER TD CERTINHO POSSO MANDO O EMAIL */
    } else {
        Email.send({
            Host: "smtp.gmail.com",
            Username: "smtpe862@gmail.com",
            Password: "testeemail",
            To: "smtpe862@gmail.com",
            From: `${email}`,
            Subject: `${name} | Google Glass`,
            Body: `${message}`,
        }).then(
            message => window.alert('EMAIL ENVIADO COM SUCESSO')
        );
    }
}