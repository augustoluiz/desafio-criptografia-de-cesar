const FormData = require('form-data')
const axios = require('axios')
const fs = require('fs');
const express = require('express')
const app = express()
let bodyFormData = new FormData()

const dados = require('../json/answer.json')
const token = 'ee706dd718bc2a9802a0898f2506a0c5f9b3c89c'
const MessageController = require('./controllers/messageController')


app.use(express.json())

app.get('/', (req, res) => {
    res.json(dados)
})

app.listen(3333, () => {
    console.log('Server is running on port 3333')
    const messageController = new MessageController(dados.cifrado, dados.numero_casas)
    dados.decifrado = messageController.decifraMensagem()
    dados.resumo_criptografico = messageController.getResumoCriptografado(dados.decifrado)
    console.log(dados)
    messageController.criaResposta(dados)
    enviaResposta()
})

async function enviaResposta(){
    const formData = new FormData()
    formData.append('answer', fs.createReadStream('./resposta.json'))
    await axios.post(`https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`, formData, {
        headers: formData.getHeaders()
    }).then(resp => {
        console.log('then'+resp)
    }).catch(resp => {
        console.log('catch'+resp)
    })
}
