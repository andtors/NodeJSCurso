import {useContext, useState} from 'react'

import { Link } from 'react-router-dom'
import Input from '../../form/Input'

import '../../form/Form.css'

/* Context */
import {Context} from '../../../context/UserContext'

const Login = () => {

  const [user, setUser] = useState({})
  const {login} = useContext(Context)

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
    
  }

  function handleSubmit(e){
    e.preventDefault()
    login(user)
  }

  return (
    <section className='form-container'>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail" type="email" name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha" type="password" name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Ainda não tem conta? <Link to="/register">Clique aqui!</Link>
      </p>
    </section>
  )
}

export default Login