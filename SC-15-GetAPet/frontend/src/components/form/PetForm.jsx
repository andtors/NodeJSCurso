import React from 'react'
import './Form.css'
import './Input.css'

import { useState } from 'react'

import Input from './Input'
import Select from './Select'

const PetForm = ({ handleSubmit, petData, btnText }) => {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Caramelo", "Cinza", "Mesclado"]

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images: [...e.target.files] })
    }

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    function handleColor(e) {
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
    }

    function submit(e) {
        e.preventDefault()

        handleSubmit(pet)
    }
    return (
        <form onSubmit={submit} className='form-container'>
            <div className='preview-pet-images'>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img src={URL.createObjectURL(image)}
                            alt={pet.name}
                            key={`${pet.name}+${index}`} />
                    )) :
                    pet.images &&
                    pet.images.map((image, index) => (
                        <img src={`http://localhost:3000/images/pets/${image}`} alt={pet.name}
                            key={`${pet.name}+${index}`} />
                    ))
                }
            </div>
            <Input text="Imagens do Pet" type="file" name="images" handleOnChange={onFileChange} multiple={true} />
            <Input
                text="Nome do Pet" type="text"
                name="name" value={pet.name || ""}
                placeholder="Digite o nome do Pet"
                handleOnChange={handleChange} />
            <Input
                text="Idade do Pet" type="number"
                name="age" value={pet.age || ""}
                placeholder="Digite a idade do Pet"
                handleOnChange={handleChange} />
            <Input
                text="Peso do Pet" type="number"
                name="weight" value={pet.weight || ""}
                placeholder="Digite o peso do Pet"
                handleOnChange={handleChange} />

            <Select
                name="color"
                text="Selecione a cor"
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ""} />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default PetForm