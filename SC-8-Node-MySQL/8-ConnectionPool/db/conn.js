const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Oieusougoku10!',
    database: 'nodemysql1'
})
console.log('MySQL conectado!')
module.exports = pool