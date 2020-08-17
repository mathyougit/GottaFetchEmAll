import React from 'react';

const TrainerCollection = (props) => {
  const pokeCollection = props.pokeCollection;

  return(
    <div className='trainer-collection'>
      Have a look at your Pokemon! <br />
      {pokeCollection.pokemons.map(pokemon => { return <img src={pokemon.sprite}></img> })}
    </div>
  )
}

export default TrainerCollection;