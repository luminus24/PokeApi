import React from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import '../styles/Home.css'

const Home = () => {

    const dispatch = useDispatch()
    const navigate =  useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const inputValue = e.target.name.value.trim()
        if(inputValue.length !== 0){
            dispatch(setNameTrainer(inputValue))
            navigate('/pokedex')
        }
    }
    return (
        <div className='home'>
            <img className = 'home-img' src="https://i0.wp.com/www.lacasadeel.net/wp-content/uploads/2012/02/pokemon-season-8-episode-400-saved-by-the-beldum.png?
            resize=511%2C371" alt="" />
            <h2 className='home-text'>¡Hi Trainer!</h2>
            <form onSubmit = {handleSubmit}>
                <input id = 'name' type="text" placeholder='Give me your name'/>
                <button className='home-button'> Let`s GO </button>
            </form>
        </div>
    )
}

export default Home