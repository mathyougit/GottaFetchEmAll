import React, { useState } from 'react';
// import any css for this section

const NewTrainer = (props) => {

  const handleNewTrainer = (newTrainer) => {
    props.handleNewTrainer({ newTrainerNeededChange: false, newTrainerSubmittedChange: true, newTrainer })
  };

  const [newTrainerInput, setNewTrainerInput] = useState('');
  const [newTrainerInputError, setNewTrainerInputError] = useState('');

  const handleChange = e => {
    setNewTrainerInput(e.target.value);
  }

  const handleClick = () => {
    if (!/^[a-z0-9]+$/i.test(newTrainerInput)) {
      setNewTrainerInputError(`Invalid Name: ${newTrainerInput}. Please only use alphanumeric characters for your trainer name.`);
      setNewTrainerInput('');
      return;
    }
    fetch('https://gottafetchemall.herokuapp.com/trainer',
      {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: newTrainerInput })
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return fetch(`https://gottafetchemall.herokuapp.com/trainer/${data._id}`,
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
    .then((newTrainer) => {
      handleNewTrainer(newTrainer);
    })
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && newTrainerInput) {
      handleClick();
    }
  }

  return (
    <>
      {
        <div className='new-trainer-section'>
          <div className='new-trainer-message'> Do you want to be the very best, the best there ever was? <br />
          Get started by entering your pokemon trainer name. <br />
          </div>
          {
            newTrainerInputError &&
            <div className='new-trainer-input-error'>
              {newTrainerInputError}
            </div>
          }
          <input className='new-trainer-input-input'
            onChange={handleChange}
            type='text'
            value={newTrainerInput}
            placeHolder='Enter Trainer Name'
            onKeyDown={handleKeyDown}
          />
          <button className='new-trainer-input-button'
            onClick={handleClick}
            disabled={!newTrainerInput}
          >
            Enter
        </button>
        </div>
      }
    </>
  )

}

export default NewTrainer;