import React from "react";
import {useAxios} from "./hooks";
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
  const [pokemon, setPokemon, removeCards] = useAxios("pokeDex", "https://pokeapi.co/api/v2/pokemon/",func);
  
  // const [state, setState] = useLocalStorage('pokemon');

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [state])

  const savePokemon = async (name) => {
    await setPokemon(name);
    // setState(pokemon.slice());
  };
  const removeAllPokemon = async () => {
    await removeCards();
    // setState({});
  };

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={savePokemon} />
        <div>
        <button onClick={removeAllPokemon}>Remove all playing cards!</button>
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
