const alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('')
const sha1 = require('sha1')
const fs = require('fs');

class MessageController{
    constructor(cifrado, numero_casas){
        this._cifrado = cifrado.split('')
        this._numero_casas = numero_casas
    }

    decifraMensagem(){
        const new_array = this._cifrado.map(caracter => {
            if(alfabeto.includes(caracter.toLowerCase())){
                const index = alfabeto.indexOf(caracter)-this._numero_casas
                caracter = index < 0 ? alfabeto[alfabeto.length + index] : alfabeto[index]
            }
            return caracter
        })

        return new_array.join('')
    }

    getResumoCriptografado(decifrado){
        return sha1(decifrado)
    }

    criaResposta(dados){
        fs.writeFile ("resposta.json", JSON.stringify(dados), function(err) {
            if (err) throw err;
            console.log('arquivo de resposta criado');
            }
        );
    }
}

module.exports = MessageController