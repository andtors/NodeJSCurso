import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import RoundedImage from "../../layouts/RoundedImage"
import useFlashMessage from "../../../hooks/useFlashMessage"
import api from "../../../utils/api"
import './Dashboard.css'

const MyPets = () => {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setPets(response.data.pets)
            })
    }, [token])

    return (
        <section >
            <div className="petlist-header">
                <h1>My Pets</h1>
                <Link to="/pet/add">Cadastrar pet</Link>
            </div>

            <div className="petlist-container">
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div key={pet._id} className="petlist-row">
                            <RoundedImage className="rounded-imagepx75"
                                src={`http://localhost:3000/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                            />
                            <span className="bold">{pet.name}</span>
                            <div className="actions">
                                {pet.available ? (
                                    <>
                                        {pet.adopter && <button className="conclude-btn">Concluir adoção</button>}
                                        <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                        <button>Excluir</button>
                                    </>
                                ) : (
                                    <p> Pet já adotado</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
                {pets.length === 0 && (
                    <p>Não há pets cadastrado</p>
                )}
            </div>
        </section>
    )
}

export default MyPets