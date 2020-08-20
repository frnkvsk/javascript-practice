import React, {useEffect} from "react";
import {useAxios, useLocalStorage} from "./hooks";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {

  const func = d => (
    {
      'front': d.sprites.front_default, 
      'back': d.sprites.back_default, 
      'name': d.name, 
      'stats': d.stats.map(e => (
          {"name":e.stat.name, "value":e.base_stat }
        )
      )
    }  
  )
  let [pokemon, setPokemon, removeCards] = useAxios("https://pokeapi.co/api/v2/pokemon/",func);
  
  const [state, setState] = useLocalStorage('pokemon');

  useEffect(() => {
    pokemon = state;
    setState(pokemon.slice());
  }, [pokemon]);

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={setPokemon} />
        <div>
        <button onClick={removeCards}>Remove all playing cards!</button>
      </div>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats.map(stat => (
                { value: stat.value, name: stat.name }
              )
            )} 
          />         
        ))}
      </div>      
    </div>
  );
}

export default PokeDex;
