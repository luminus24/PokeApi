import React from 'react'

const StatsPokemon = ({infoStat}) => {
  return (
    <li>
        <h4 className='info'>{infoStat.stat.name}</h4>
        <p className='info-stat'>{infoStat.base_stat}</p>
    </li>
  )
}

export default StatsPokemon