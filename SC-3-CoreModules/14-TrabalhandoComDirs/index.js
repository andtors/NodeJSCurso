const fs = require('fs')

if(!fs.existsSync('SC-3-CoreModules/14-TrabalhandoComDirs/minhapasta')){
    console.log('Não existe')
    fs.mkdirSync('SC-3-CoreModules/14-TrabalhandoComDirs/minhapasta')
} else if (fs.existsSync('SC-3-CoreModules/14-TrabalhandoComDirs/minhapasta')){
    console.log('existe')
}

