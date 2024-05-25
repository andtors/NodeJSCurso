const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('toughts1', 'root', 'Oieusougoku10!', {
    host:'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch (error) {
   console.log(`Erro na hora de conectar: ${error}`)
}

module.exports = sequelize