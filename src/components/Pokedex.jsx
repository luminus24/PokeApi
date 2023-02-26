import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PokemonCard from "./Pokedex/PokemonCard"
import SearchInput from "./Pokedex/SearchInput"
import SelectType from "./Pokedex/SelectType"
import "../styles/Pokedex.css"

const Pokedex = () => {
	const [pokemons, setPokemons] = useState()
	const [pokeSearch, setPokeSearch] = useState()
	const [typeSelect, setTypeSelect] = useState("All")
	const [nextPokemons, setNextPokemons] = useState(null)
	const [previousPokemons, setPreviousPokemons] = useState(null)
	const [actualPokemons, setActualPokemons] = useState(
		"https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15"
	)

	const nameTrainer = useSelector((state) => state.nameTrainer)

	useEffect(() => {
		axios.get(actualPokemons).then((res) => {
			setPokemons(res.data)
			setNextPokemons(res.data.next)
			setPreviousPokemons(res.data.previous)
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			})
		})
	}, [actualPokemons])

	useEffect(() => {
		let URL
		if (typeSelect !== "All") {
			URL = `https://pokeapi.co/api/v2/type/${typeSelect}/`
			axios
				.get(URL)
				.then((res) => {
					const arr = res.data.pokemon.map((e) => e.pokemon)
					setPokemons({ results: arr })
				})
				.catch((err) => console.log(err))
		} else if (pokeSearch) {
			const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
			const obj = {
				results: [{ url }],
			}
			setPokemons(obj)
		}
	}, [pokeSearch, typeSelect])

	return (
		<div className="cards-container">
			<div className="cards-header" id="top-page">
				<img
					className="cards-image"
					src="https://www.bizak.es/wp-content/uploads/2018/09/BANNER-26-POKEMON-1920X700-1170x427.jpg"
					alt="Pokedex Header"
				/>
				<h1 className="cards-name">Welcome {nameTrainer} to the Pokedex</h1>
			</div>
			<div className="cards-form">
				<SearchInput
					setPokeSearch={setPokeSearch}
					setTypeSelect={setTypeSelect}
				/>
				<SelectType
					setTypeSelect={setTypeSelect}
					typeSelect={typeSelect}
					setPokeSearch={setPokeSearch}
				/>
			</div>
			<div className="cards">
				{pokemons?.results.map((pokemon) => (
					<PokemonCard key={pokemon.url} url={pokemon.url} />
				))}
			</div>
			<footer className="pagination">
				<button
					className="button-previous"
					onClick={() => setActualPokemons(previousPokemons)}
				>
					<i class="fas fa-chevron-left fa-lg"></i>
				</button>
				<button
					className="button-next"
					onClick={() => setActualPokemons(nextPokemons)}
				>
					<i class="fas fa-chevron-right fa-lg"></i>
				</button>
			</footer>
		</div>
	)
}

export default Pokedex
