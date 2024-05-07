const fs = require('fs') // file system

const path = 'SC-1-Intro/2-UtilizandoModulo/arquivo.txt'

fs.readFile(path, 'utf8', (err, data) => {

    if(err){
        console.log(err)
        return
    } 

    console.log(data)

})