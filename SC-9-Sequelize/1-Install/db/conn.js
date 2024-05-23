const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodesequelize1', 'root', 'Oieusougoku10!', {
    host:'localhost',
    dialect: 'mysql'
})


try {
    
    sequelize.authenticate()
    console.log('Conectamos com sucessno no Sequelize!')

} catch (error) {
    console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize