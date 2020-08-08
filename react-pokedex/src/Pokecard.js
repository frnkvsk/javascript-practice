import React from 'react';
import './Pokecard.css'


const Pokecard = (props) => {
  const POKE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
  return (
    <div className="Pokecard">
      <div className="Pokecard-name">{props.name}</div>
      <img className="Pokecard-image" src={POKE_URL}></img>
      <div className="Pokecard-type">Type: {props.type}</div>
      <div className="Pokecard-experience">EXP: {props.base_experience}</div>
    </div>
  )
}

export default Pokecard
