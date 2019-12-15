import React from "react";
import logo from "./logo.svg";
import { PokemonViewer } from "./sections/PokemonViewer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="pokedex">
        <header className="header">
          <img src={logo} alt="logo" className="app-logo" />
        </header>
        <section className="pokemon-list-wrapper">
          <div className="pokemon-tabs">
            <PokemonViewer />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
