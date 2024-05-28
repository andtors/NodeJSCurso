const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController{
    static async register(req, res){
        const {name, email, phone, password, confirmPassword} = req.body

        // validations
        if(!name){
            res.status(422).json({message: 'O nome é obrigatorio'})
            return
        }

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatorio'})
            return
        }

        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatorio'})
            return
        }
        
        if(!password){
            res.status(422).json({message: 'A senha é obrigatorio'})
            return
        }

        if(!confirmPassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatorio'})
            return
        }
        
        if(password !== confirmPassword){
            res.status(422).json({message: 'A senha e confirmação de senha precisam ser iguais!'})
            return
        }

        // check if user exists
        const userExists = await User.findOne({email: email})
        if(userExists){
            res.status(422).json({
                message: 'Por favor, utilize outro e-mail'
            })
            return
        }

        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })
        
        try {
            const newUser = await user.save()
            
            await createUserToken(newUser, req, res)

        } catch (error) {
            res.status(500).json({message: error})

            return
        }
    }

    static async login(req, res){
        const {email, password} = req.body

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatorio'})
            return
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatorio'})
            return
        }

        const user = await User.findOne({email: email}) 
        if(!user){
            res.status(422).json({
                message: 'Não há usuário cadastrado com este e-mail!'
            })
            return
        }

        // check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({
                message: 'Senha inválida!'
            })
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            // decoded.id vem do create-user-token linha: 8
            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {

        const id = req.params.id

        const user = await User.findById(id).select("-password")

        if(!user){
            res.status(422).json({
                message:"Usuário não encontrado!"
            })

            return
        }

        res.status(200).json({ user })

    }

    static async editUser(req, res){
       
        const id = req.params.id

        // check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, email, phone, password, confirmPassword} = req.body

        if(req.file){
           user.image = req.file.filename
        }

         // validations
        if(!name){
            res.status(422).json({message: 'O nome é obrigatorio'})
            return
        }

        user.name = name

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatorio'})
            return
        }

        // check if email has already been taked
        const userExists = await User.find({email: email})

        if(user.email !== email && !userExists){
            res.status(422).json({
                message:"E-mail já em uso!"
            })
            return
        }

        user.email = email

        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatorio'})
            return
        }
        
        user.phone = phone

        
        if(password !== confirmPassword){
            res.status(422).json({message: 'A senha e confirmação de senha precisam ser iguais!'})
            return
        } else if (password === confirmPassword && password != null){
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }
        
        try {
            // return updated data
             await User.findOneAndUpdate(
                {_id: user.id },
                { $set: user },
                { new: true }
            )

            res.status(200).json({
                message: 'Usuário atualizado com suceesso!'
            })
        } catch (error) {
            
            res.status(500).json({
                message: `Aconteceu um erro: ${error}`
            })
            return
        }
    }
}