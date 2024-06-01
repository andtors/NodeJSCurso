import React from 'react'
import './PetDetails.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'

const PetDetails = () => {
    const [pet, setPet] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
       api.get(`/pets/${id}`).then((response) => {
        setPet(response.data.pet)
       })

    },[id])

    async function schedule() {
        let msgType = 'success'
        const data = await api.patch(`pets/schedule/${pet._id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
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
   <>
    {pet.name && (
        <section className='pet-details-container'>
            <div className='pet-details-header'>
                <h1>Conhecendo o Pet: {pet.name}</h1>
                <p>Se tiver interesse marque uma visita para conhece-lo!</p>
            </div>
            <div className='pet-images'> 
                {pet.images.map((image, index) => (
                    <img 
                    src={`http://localhost:3000/images/pets/${image}`}
                    alt={pet.name}
                    key={index} />
                ))}
            </div>
            <p>
                <span className="bold">
                    Peso:
                </span> {pet.weight}
            </p>
            <p>
                <span className="bold">
                    Idade:
                </span> {pet.age}
            </p>
            {token ?
             ( 
                <button onClick={schedule}>Solicitar uma visita!</button>
             ) : (
                <p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita!</p>
            )}
        </section>
    )}
   </>
  )
}

export default PetDetails