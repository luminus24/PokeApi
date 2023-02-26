import React from 'react'

const SearchInput = ({setPokeSearch, setTypeSelect}) => {

    const handleSubmit = e =>{
        e.preventDefault()
        setPokeSearch(e.target.searchText.value.trim().toLowerCase())
        setTypeSelect('All')
    }

    return (
        <form onSubmit={handleSubmit} className='search-form'>
            <input className='input-search' type="text" id='searchText' placeholder = 'Ingrese el nombre de un pokemon'/>
            <button className='button-search'>Search</button>
        </form>
    )
}

export default SearchInput

