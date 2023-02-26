import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StatsPokemon from './StatsPokemon'
import { useNavigate } from 'react-router-dom'
import '/src/styles/Card.css'
import '/src/styles/ColorType.css'

const PokemonCard = ({url}) => {

    const [pokemon, setPokemon] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(url)
            .then(res=> setPokemon(res.data))
            .catch(err=>console.log(err))
    }, [])

    const handleClick = () => navigate(`/pokedex/${pokemon.name}`)

    return (
        <article onClick={handleClick} className={`card ${pokemon?.types[0].type.name}`}>
            <header>
                <img className={`card-img ${pokemon?.types[0].type.name}`} src={pokemon?.sprites.other['official-artwork']['front_default']} alt="" />
            </header>
            <section >
                <h3 className='card-name'>{pokemon?.name}</h3>
                <ul className='card-types'>
                {
                    pokemon?.types.map(slot =>(
                        <li key={slot.type.url}>{slot.type.name}</li>
                    ))
                }
                </ul>
            </section>
            <section >
                <ul className='card-stats'>
                    {
                        pokemon?.stats.map(stat =>(
                            <StatsPokemon
                                key={stat.stat.url}
                                infoStat = {stat}
                            />
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}

export default PokemonCard