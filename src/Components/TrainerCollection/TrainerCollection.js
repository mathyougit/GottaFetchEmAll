import React, { useState } from 'react';
import './TrainerCollection.css'

const TrainerCollection = (props) => {

  const trainer = props.trainer;
  const pokemons = trainer.pokecollection.pokemons;
  
  const handleSortedTrainer = (sortedTrainer) => {
     props.handleSortedTrainer(sortedTrainer)
  }

  const [sortType, setSortType] = useState('nameAZ');

  const handleSortTypeChange = e => {
    setSortType(e.target.value);
  }

  const handleSort = () => {

    const sortedPokemons = [...pokemons];
    
    const compareNameAZ = (a,b) => {
      return (a['name'].toLowerCase() > b['name'].toLowerCase()) ? 1 : (a['name'].toLowerCase() < b['name'].toLowerCase()) ? -1 : 0;
    }
    const compareNameZA = (a,b) => {
      return (a['name'].toLowerCase() > b['name'].toLowerCase()) ? -1 : (a['name'].toLowerCase() < b['name'].toLowerCase()) ? 1 : 0;
    }
    const comparePokeIdAsc = (a,b) => {
      return (a['_id'] > b['_id']) ? 1 : (a['_id'] < b['_id']) ? -1 : 0;
    }
    const comparePokeIdDsc = (a,b) => {
      return (a['_id'] > b['_id']) ? -1 : (a['_id'] < b['_id']) ? 1 : 0;      
    }
    const compareRarityAsc = (a,b) => {
      return (a['rarity'] > b['rarity']) ? 1 : (a['rarity'] < b['rarity']) ? -1 : 0;      
    }
    const compareRarityDsc = (a,b) => {
      return (a['rarity'] > b['rarity']) ? -1 : (a['rarity'] < b['rarity']) ? 1 : 0;           
    }

    if (sortType === 'nameAZ') {
      sortedPokemons.sort( compareNameAZ )
    } 
    if (sortType === 'nameZA') {
      sortedPokemons.sort( compareNameZA )
    }
    if (sortType === 'pokeIdAsc') {
      sortedPokemons.sort( comparePokeIdAsc )
    }
    if (sortType === 'pokeIdDsc') {
      sortedPokemons.sort( comparePokeIdDsc )
    }
    if (sortType === 'rarityAsc') {
      sortedPokemons.sort( compareRarityAsc )
    }
    if (sortType === 'rarityDsc') {
      sortedPokemons.sort( compareRarityDsc )
    }

    const sortedTrainer = {...trainer};
    sortedTrainer.pokecollection.pokemons = sortedPokemons;
    
    handleSortedTrainer(sortedTrainer)
  }

  return(
    <div className='trainer-collection'>
      Have a look at your Pokemon! <br />
      <select className='trainer-collection-sort-type'
        value={sortType} 
        onChange={handleSortTypeChange}>
        <option value='nameAZ'>By Name; A-Z</option>
        <option value='nameZA'>By Name; Z-A</option>
        <option value='pokeIdAsc'>By Pokedex Id; Ascending</option>
        <option value='pokeIdDsc'>By Pokedex Id; Descending</option>
        <option value='rarityAsc'>By Rarity; Ascending</option>
        <option value='rarityDsc'>By Rarity; Descending</option>
      </select>
      <button className='trainer-collection-sort-button'
        onClick={handleSort}
      >
      Sort Collection
      </button>
      <div className='trainer-collection-pokemons'>
      {pokemons.map((pokemon, index) => { 
        return (
          <div className='trainer-collection-pokemon'
            key={pokemon.name + index}
          >
            <img src={pokemon.sprite} alt={pokemon.name}></img>
            <div>{pokemon.name}</div>
          </div>          
        ) 
      })}
      </div>
    </div>
  )
}

export default TrainerCollection;