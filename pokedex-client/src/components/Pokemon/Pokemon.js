import React from "react";
import "./Pokemon.css";

function Pills(props) {
  return <ul className="pills">{props.children}</ul>;
}

function Pill(props) {
  return <li className="pill">{props.children}</li>;
}

function PokemonList(props) {
  const { children, innerRef, ...rest } = props;
  return (
    <ul ref={innerRef} className="pokemon-list" {...rest}>
      {children}
    </ul>
  );
}

function PokemonItem(props) {
  const {
    onSelect,
    selected,
    ThumbnailImage,
    ThumbnailAltText,
    abilities,
    weakness,
    type,
    name,
    innerRef,
    ...rest
  } = props;
  return (
    <li ref={innerRef} className="pokemon-item" {...rest}>
      <button className="pokemon-checkbox-button" onClick={onSelect}>
        <div className={`pokemon-checkbox ${selected ? "selected" : ""}`}></div>
      </button>
      <img
        className="pokemon-thumbnail"
        src={ThumbnailImage}
        alt={ThumbnailAltText}
      />
      <div className="pokemon-details">
        <div className="pokemon-info">
          <p className="pokemon-name">{name}</p>
          <div className="pokemon-type">
            <Pills>
              {type.map(pokemonType => (
                <Pill key={pokemonType}>{pokemonType}</Pill>
              ))}
            </Pills>
          </div>
        </div>
        <div className="pokemon-additional-info pokemon-abilities">
          <h4 className="info-title">Abilities</h4>
          <ul className="pokemon-info-list abilities">
            {abilities.map((ability, index) => (
              <li className="pokemon-info-list-item ability-item" key={ability}>
                {ability}
                {index === abilities.length - 1 ? null : ","}
              </li>
            ))}
          </ul>
        </div>
        <div className="pokemon-additional-info pokemon-weakness">
          <h4 className="info-title">Weakness</h4>
          <ul className="pokemon-info-list weakness">
            {weakness.map((pokemonWeakness, index) => (
              <li
                className="pokemon-info-list-item weakness-item"
                key={pokemonWeakness}
              >
                {pokemonWeakness}
                {index === weakness.length - 1 ? null : ","}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export { PokemonList, PokemonItem };
