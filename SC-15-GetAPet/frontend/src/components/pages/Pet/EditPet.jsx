import api from '../../../utils/api'
import input from '../../form/Input'
import PetForm from '../../form/PetForm'
import { useState, useEffect } from 'react'
import './AddPet.css'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useParams } from 'react-router-dom'

const EditPet = () => {
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get(`/pets/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        })
        .then((response) => {
            setPet(response.data.pet)
        })

    }, [token, id])

    async function updatePet(pet){
        let msgType = 'success'
        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`pets/${pet._id}`, formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type' : 'multipart/formdata'
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }
  return (
    <section>
        <div className="addpet-header">
            <h1>Editando o Pet: {pet.name}</h1>
            <p>Depois da edição os dados serão atualizados no sistema</p>
        </div>
        {pet.name && (
            <PetForm handleSubmit={updatePet} btnText='Atualizar' petData={pet} />
        )}
    </section>
  )
}

export default EditPet