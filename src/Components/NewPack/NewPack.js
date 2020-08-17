import React from 'react';

const NewPack = (props) => {

  const handleNewPack = (updateTrainerData) => {
    props.handleNewPack(updateTrainerData)
  }

  const trainerId = props.trainerId;
  const packType = props.packType;
  const packPrice = props.packPrice;

  const handleOnClick = () => {
    fetch('https://gottafetchemall.herokuapp.com/pokeCollection/pack',
      {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          trainerId,
          packType,
        })
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((packData) => {
      console.log(packData);
      return fetch(`https://gottafetchemall.herokuapp.com/trainer/${trainerId}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          method: 'GET'
        }
      )
    })
    .then((response) => {
      return response.json();
    })
    .then((updateTrainerData) => {
      handleNewPack(updateTrainerData);
    })
  }

  return (
    <div className={`new-pack-section-${packType}`}>
      <div className='new-pack-cost'>{packPrice}</div>
      <button className='new-pack-button'
        onClick={handleOnClick}>
        {packType}
      </button>
    </div>
  )

}

export default NewPack;