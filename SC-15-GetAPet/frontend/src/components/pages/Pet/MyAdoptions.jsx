import './MyAdoptions.css'
import React from 'react'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import RoundedImage from '../../layouts/RoundedImage'

const MyAdoptions = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    const [pets, setPets] = useState([])

    useEffect(() => {
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setPets(response.data.pets)
                console.log(pets)
            })
    }, [token])

    return (
        <section>
            <div className='petlist-header'>
                <h1>Minhas adoções:</h1>
            </div>
            <div className="petlist-container">
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div key={pet._id} className="petlist-row">
                            <RoundedImage className="rounded-imagepx75"
                                src={`http://localhost:3000/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                            />
                             <span className="bold">{pet.name}</span>
                            <div className='contacts'>
                                <p>
                                    <span className='bold'>Fale com:</span>
                                    {pet.user.name}
                                </p>
                                <p>
                                    <span className='bold'>Ligue para:</span>
                                    {pet.user.phone}
                                </p>
                            </div>
                           
                            <div className="actions">
                                {pet.available ? (
                                    <p>Adoção em processo</p>
                                ) : (
                                    <p>Parabéns por concluir a adoção!</p>
                                )}
                            </div>
                        </div>
                    ))
                }
                {pets.length === 0 &&
                    <p>Ainda não há adoções de Pets.</p>
                }
            </div>
        </section>
    )
}

export default MyAdoptions