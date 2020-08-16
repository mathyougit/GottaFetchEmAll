import React from 'react';

const NewPack = (props) => {

  const handleNewPack = () => {
    props.handleNewPack()
  }

  const trainerId = props.trainerId;
  const packType = props.packType;
  const packPrice = props.packPrice;

  const handleOnClick = () => {
    return fetch('https://gottafetchemall.herokuapp.com/pokeCollection/pack',
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
    .then((data) => {
      handleNewPack()
    // do something wit hthe data here, probably to show the new pack pokemon
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