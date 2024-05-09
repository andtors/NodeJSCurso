const fs = require('fs')

fs.unlink('SC-3-CoreModules/8-RemovendoArquivos/arquivo.txt', function(err){
    if(err){
        console.log(err)
        return
    }

    console.log('Arquivo removido!')
})