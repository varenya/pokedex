import React, { useContext, useState } from "react";
import { useAsync } from "react-async-hook";
import { getPokemons } from "../api/pokemons";
import { getCategories } from "../api/category";

const PokemonData = React.createContext();

function groupBy(propertyName, listData) {
  const result = {};
  listData.forEach(eachData => {
    if (eachData.hasOwnProperty(propertyName)) {
      const currentKey = eachData[propertyName];
      const currentValue = result[propertyName] || [];
      result[currentKey] = [...currentValue, eachData];
    }
  });
  return result;
}

function getAllData() {
  return Promise.all([getCategories(), getPokemons()]);
}

function PokemonLoader(props) {
  const [refetchToggle, setRefetchToggle] = useState(false);

  const { loading, error, result } = useAsync(getAllData, [refetchToggle]);

  function refetch() {
    setRefetchToggle(state => !state);
  }

  if (loading) {
    return <h1>Loading..</h1>;
  } else if (error) {
    return <h1>Error Occurred!</h1>;
  }

  const [categories, pokemonData] = result;
  return (
    <PokemonData.Provider value={{ pokemonData, categories, refetch }}>
      {props.children}
    </PokemonData.Provider>
  );
}

function usePokemonDB() {
  const pokemonDataContext = useContext(PokemonData);
  if (pokemonDataContext === undefined) {
    throw new Error("component needs to be wrapped insided PokemonLoader");
  }
  const { pokemonData, categories, refetch } = pokemonDataContext;

  const pokemonDB = groupBy("id", pokemonData);

  function getPokemonDetails(id) {
    return pokemonDB[id];
  }
  function getAllPokemons() {
    return pokemonData;
  }

  function getAllCategories() {
    return categories.map(category => {
      const { pokemons } = category;
      return {
        ...category,
        pokemons: pokemons.map(({ pokemon_id }) => {
          const [pokemon] = getPokemonDetails(pokemon_id);
          return pokemon;
        })
      };
    });
  }

  return { getAllPokemons, getPokemonDetails, getAllCategories, refetch };
}

export { PokemonLoader, usePokemonDB };
