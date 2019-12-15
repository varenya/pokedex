import React, { Fragment, useState } from "react";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "../components/Tabs";
import { PokemonList, PokemonItem } from "../components/Pokemon";
import { CategoryForm } from "../components/CategoryForm";
import { PokemonLoader, usePokemonDB } from "./PokemonLoader";
import { DraggablePokemonViewer } from "./DraggablePokemonViewer";
import produce from "immer";

const selectPokemon = produce((draft, id) => {
  draft[id] = !draft[id];
});

function isAnyPokemonSelected(selectedPokemon) {
  return Object.values(selectedPokemon).filter(val => val).length !== 0;
}

function PokemonUI() {
  const [state, setState] = useState({});
  const [showCategoryForm, setCategoryForm] = useState(false);
  const { getAllPokemons, getAllCategories, refetch } = usePokemonDB();

  function toggleCategoryForm() {
    setCategoryForm(state => !state);
  }

  function getSelectedPokemons() {
    return Object.keys(state).map(id => ({ pokemon_id: id }));
  }

  function handleSelect(id) {
    setState(state => selectPokemon(state, id));
  }

  function isPokemonSelected(id) {
    return state[id];
  }

  const pokemonData = getAllPokemons();
  const categories = getAllCategories();

  return (
    <Fragment>
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          {categories.map(({ id, category }) => (
            <Tab key={id}>{category}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <PokemonList>
              {pokemonData.map(pokemon => {
                return (
                  <PokemonItem
                    key={pokemon.id}
                    {...pokemon}
                    onSelect={() => handleSelect(pokemon.id)}
                    selected={isPokemonSelected(pokemon.id)}
                  />
                );
              })}
            </PokemonList>
          </TabPanel>
          {categories.map(({ id, category, pokemons }) => (
            <TabPanel key={id}>
              <PokemonList>
                <DraggablePokemonViewer
                  refetch={refetch}
                  category={id}
                  pokemons={pokemons}
                />
              </PokemonList>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      {isAnyPokemonSelected(state) ? (
        <button onClick={toggleCategoryForm} className="add-to-category">
          Add to category
        </button>
      ) : null}
      {showCategoryForm ? (
        <CategoryForm
          pokemons={getSelectedPokemons()}
          categories={categories}
          closeModal={() => setCategoryForm(false)}
        />
      ) : null}
    </Fragment>
  );
}
function PokemonViewer(props) {
  return (
    <PokemonLoader>
      <PokemonUI />
    </PokemonLoader>
  );
}

export { PokemonViewer };
