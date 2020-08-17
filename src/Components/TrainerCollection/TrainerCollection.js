import React, { useState } from 'react';
import './TrainerCollection.css'

const TrainerCollection = (props) => {
  const [pokemons, setPokemons] = useState(props.pokemons);

  const handleSort = (sortType) => {
    const compareNameAZ = (a,b) => {
      return (a['name'].toLowerCase() > b['name'].toLowerCase()) ? 1 : (a['name'].toLowerCase() < b['name'].toLowerCase()) ? -1 : 0;
    }
    const compareNameZA = (a,b) => {
      return (a['name'].toLowerCase() > b['name'].toLowerCase()) ? -1 : (a['name'].toLowerCase() < b['name'].toLowerCase()) ? 1 : 0;
    }
    const sortedPokemons = [...pokemons];
    if (sortType === 'name/a-z') {
      sortedPokemons.sort( compareNameAZ )
    } 
    if (sortType === 'name/z-a') {
      sortedPokemons.sort( compareNameZA )
    }
    setPokemons(sortedPokemons)
  }

  return(
    <div className='trainer-collection'>
      Have a look at your Pokemon! <br />
      <button className='trainer-collection-sort'
        onClick={handleSort}
      >
      Sort Collection
      </button>
      <div className='trainer-collection-pokemons'>
      {pokemons.map(pokemon => { 
        return (
          <div className='trainer-collection-pokemon'>
            <img src={pokemon.sprite}></img>
            <div>{pokemon.name}</div>
          </div>          
        ) 
      })}
      </div>
    </div>
  )
}

export default TrainerCollection;