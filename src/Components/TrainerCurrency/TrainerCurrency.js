import React from 'react';

const TrainerCurrency = (props) => {

  const trainerId = props.trainerId;
  const currency = props.currency;
  const handleTrainerCurrency = (updatedTrainerCurrency) => {
    props.handleTrainerCurrency(updatedTrainerCurrency);
  }


  const handleAddCurrencyOnClick = () => {

    fetch('https://gottafetchemall.herokuapp.com/trainer/currency', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
        trainerId,
        currency
      })
    })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      return fetch(`https://gottafetchemall.herokuapp.com/trainer/${trainerId}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          method: 'GET'
        })
    })
    .then((response) => {
      return response.json()
    })
    .then((updatedTrainerCurrency) => {
      handleTrainerCurrency(updatedTrainerCurrency);
    })

  }

  return (
    <div className='trainer-currency-add-section'>
      <button className='trainer-currecny-add-button'
        onClick={handleAddCurrencyOnClick}
      >
        Add {currency}
      </button>
    </div>
  )

}

export default TrainerCurrency;