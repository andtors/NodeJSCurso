import React from 'react'
import api from '../../../utils/api'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import PetForm from '../../form/PetForm'

import './AddPet.css'

const AddPet = () => {
    const navigate = useNavigate()
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    async function registerPet(pet){
        let msgType = 'success'
        
        const formData = new FormData

        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.post('pets/create', formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type' : 'multipart/form-data'
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

        if(msgType !== 'error'){
            navigate('/pet/mypets')
        }
    }

    return (
        <section className='addpet-header'>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponivel para adoção!</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
        </section>
    )
}

export default AddPet