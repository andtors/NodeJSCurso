// modulos externos
import inquirer from 'inquirer'
import chalk from 'chalk'

// modulos internos
import fs from 'fs'
import { create } from 'domain'

operation()

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }
])
.then((answer) => {
    const action = answer['action']
    if(action === 'Criar Conta'){
        createAccount()
    } else if(action === 'Consultar Saldo'){

    } else if(action === 'Depositar'){
        deposit()
    } else if(action === 'Sacar'){

    } else if(action === 'Sair'){
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
    }
})
.catch((err) => console.log(err))
}

// create an account
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta:'
        }
    ]).then(answer => {
        const accountName = answer['accountName']
        
        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta já existe! Insira outro nome.'))            
            buildAccount()
            return
        }
        
        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance" : 0}', function(err){
            console.log(err)
        })

        console.log(chalk.green('Parabéns! sua conta foi criada.'))
        operation()
    }).catch((err) => console.log(err))
}

// add an amout to user account
function deposit() {
    inquirer
      .prompt([
        {
          name: 'accountName',
          message: 'Qual o nome da sua conta?',
        },
      ])
      .then((answer) => {
        const accountName = answer['accountName']
  
        if (!checkAccount(accountName)) {
          return deposit()
        }
  
        inquirer
          .prompt([
            {
              name: 'amount',
              message: 'Quanto você deseja depositar?',
            },
          ])
          .then((answer) => {
            const amount = answer['amount']
  
            addAmount(accountName, amount)
            operation()
          })
      })
  }
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe!'))
        return false
    }

    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)
  
    if (!amount) {
      console.log(
        chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
      )
      return deposit()
    }
  
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
  
    fs.writeFileSync(
      `accounts/${accountName}.json`,
      JSON.stringify(accountData),
      function (err) {
        console.log(err)
      },
    )
  
    console.log(
      chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`),
    )
  }

  function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
      encoding: 'utf8',
      flag: 'r',
    })
  
    return JSON.parse(accountJSON)
  }