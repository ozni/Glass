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
    let name = document.querySelector('input#cNome')
    let email = document.querySelector('input#cEmail')
    let message = document.querySelector('textarea#cMsg')
    elementos = [name, email, message]
    let pNome = document.querySelector('p#errorName')
    let pEmail = document.querySelector('p#errorEmail')
    let pMsg = document.querySelector('p#errorMessage')
    paragrafos = [pNome, pEmail, pMsg]
    const regEmail = /^[a-z 0-9.]+@[a-z]+(\.com|\.com\.br)$/

    /*EMBORA ALGUMAS DESSAS PROPRIEDADES ABAIXO JÁ ESTEJAM DEFINIDAS NA PÁGINA DE ESTILOS
      TENHO QUE DEFINI-LAS AQUI TBM, PORQUE QUANDO O USUARIO CORRIGIR UM ERRO DELE, 
      E CLICAR EM ENVIAR MENSAGEM, MESMO COM OS CAMPOS JÁ PREENCHIDOS, E EMAIL JÁ CORRIGIDO, 
      A BORDA DO INPUT CONTINUARÁ VERMELHA, E A INFORMAÇÃO DE ERRO CONTINUARÁ APARECENDO.
      OU SEJA, DA LINHA 57 A 63 TEMOS UMA GAMBIARRA DE "REFRESH"*/
    elementos.forEach(item => {
        item.style.border = "1px solid black"
    })

    paragrafos.forEach(item => {
        item.innerHTML = ""
    })

    //1ª PARTE DA VERIFICAÇÃO (CAMPOS EM BRANCO) 
    if (!name.checkValidity() || !email.checkValidity() || !message.checkValidity()){
        window.alert('CAMPOS OBRIGATÓRIOS NÃO PREENCHIDOS! TENTE NOVAMENTE')
        document.querySelector('p#errorName').innerHTML = name.validationMessage
        document.querySelector('p#errorEmail').innerHTML = email.validationMessage
        document.querySelector('p#errorMessage').innerHTML = message.validationMessage
        elementos.forEach(item => {
            if(!item.checkValidity()){
                item.style.border="1px solid red"
            }
        })

    //2ª PARTE DA VERIFICAÇÃO (EMAIL VÁLIDO)
    } else if (regEmail.test(email.value) == false){
        window.alert('EMAIL INVALIDO! TENTE NOVAMENTE')
        email.style.border="1px red solid"
        pEmail.innerHTML = "Certifique-se de que não há erros no email informado"

    //SE TIVER TD CERTINHO POSSO MANDAR O EMAIL
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