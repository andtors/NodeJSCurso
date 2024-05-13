const express = require('express')
const app = express()
const port = 3000

const path = require('path')

// ler o body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// arquivos estaticos
app.use(express.static('public'))

const basePath = path.join(__dirname, 'templates')

const users = require('./users')

app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
   console.log(`Servidor rodando na porta: ${port}`)
})


