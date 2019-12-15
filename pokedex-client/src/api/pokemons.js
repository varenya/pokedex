import { fetchData } from "./fetchHelper";
import { BASE_URI } from "../constants/API";
function getPokemons() {
  return fetchData(`${BASE_URI}/pokemons/`);
}

export { getPokemons };
