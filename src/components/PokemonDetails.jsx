import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AbilitiesPokemon from './Pokedex/AbilitiesPokemon'
import StatsPokemon from './Pokedex/StatsPokemon'
import '/src/styles/Details.css'
import '/src/styles/ColorType.css'

const PokemonDetails = () => {

    const [pokeInfo, setPokeInfo] = useState()
    const {name} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${name}`
        axios.get(URL)
            .then(res => setPokeInfo(res.data))
            .catch(err => console.log(err))
    }, [])
    const handleClick = () =>{
        navigate('/pokedex')
    }
    return (
        <div className='poke-details'>
            <button className='button-back' onClick={handleClick}><i class="fas fa-chevron-left fa-lg" ></i></button>
            <article className='details-container'>
                <div className='poke-header'>
                    <img  className={` poke-skin ${pokeInfo?.types[0].type.name}`} src={pokeInfo?.sprites.other['official-artwork'].front_default} alt="Pokemon Sprite" />
                    <h1 className='poke-name'>{name}</h1>
                    <ul className='poke-types'>
                        {
                            pokeInfo?.types.map(slot =>(
                                <li key={slot.type.url}>{slot.type.name}</li>
                            ))
                        }
                        </ul>
                </div>
                <div className='poke-info'>
                    <div className='stats-container'>
                        <h2>Stats</h2>
                        <ul className='poke-stats'>
                                {
                                    pokeInfo?.stats.map(stat =>(
                                        <StatsPokemon
                                            key={stat.stat.url}
                                            infoStat = {stat}
                                        />
                                    ))
                                }
                        </ul>
                    </div>
                    <div className='abilities-container'>
                        <h2>Habilities</h2>
                        <ul className='poke-abilities'>
                            {
                                pokeInfo?.abilities.map(ability =>(
                                    <AbilitiesPokemon
                                        key={ability.ability.url}
                                        infoAbility={ability}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                </div>
        </article>
        </div>
    )
}

export default PokemonDetails