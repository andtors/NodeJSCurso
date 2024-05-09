const fs = require('fs')

const arqAntigo = 'SC-3-CoreModules/9-RenomeandoArquivos/arquivo.txt'
const arqNovo = 'SC-3-CoreModules/9-RenomeandoArquivos/novo.txt'

fs.rename(arqAntigo, arqNovo, function(err) {
    if(err){
        console.log(err)
        return
    }

    console.log(`O arquivo ${arqAntigo} foi renomeado para ${arqNovo}`)
})