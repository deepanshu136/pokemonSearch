import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch Pokémon data from API
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle Search
  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  // Filter Pokémon based on search input
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search)
  );

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />

      <div className="card-container">
        {filteredPokemon.map((pokemon, index) => (
          <div key={index} className="card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h3>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
