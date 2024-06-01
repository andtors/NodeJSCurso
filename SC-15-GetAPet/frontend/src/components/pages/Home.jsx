import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Link } from 'react-router-dom'

import './Home.css'

const Home = () => {
  const [pets, setPets] = useState([])

  useEffect(() => {
    api.get('/pets').then((response) => {
      setPets(response.data.pets)
    })
  }, [])
  return (
    <section>
       <div className='pet-home-header'>
        <h1>Adote um Pet!</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles!</p>
       </div>
       <div className='pet-container'>
        {pets.length > 0 && 
          pets.map((pet) => (
            <div key={pet._id} className='pet-card'>
             <div style={{backgroundImage: `url(http://localhost:3000/images/pets/${pet.images[0]})`}} className='pet-card-image'>
             </div>
              <h3>{pet.name}</h3>
              <p>
                <span className='bold'>Peso: {pet.weight}kg</span>
              </p>
              {pet.available ? (
               <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className='adopted-text'>Adotado!</p>
              )}
            </div>
          ))}
        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponiveis para adoção no momento!</p>
        )}
       </div>
    </section>
  )
}

export default Home