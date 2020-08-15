import React, { useState } from 'react'
// import any css for this section

const NewTrainer = (props) => {
  const [input, setInput] = useState('')
  const [newTrainerNeededError, setNewTrainerNeededError] = useState('')
  const [newTrainerSubmitted, setNewTrainerSubmitted] = useState(false);
  const [trainer, setTrainer] = useState(null) // is this needed in this functional component or the parent?
  const [newPack, setNewPack] = useState([])

  const handleChange = e => {
   setInput(e.target.value);
  }

  const handleClick = () => {
    if (!/^[a-z0-9]+$/i.test(input)) {
      setNewTrainerNeededError(`Invalid Name: ${input}. Please only use alphanumeric characters for your trainer name.`);
      setInput('');
      return
    }
    fetch('https://gottafetchemall.herokuapp.com/trainer',
      {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: input })
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        localStorage.setItem('pokemonTrainerId', data._id)
        setNewTrainerSubmitted(true);
        setTrainer(data);
        setInput('');
        return data;
      })
      .then((data) => {
        return fetch('https://gottafetchemall.herokuapp.com/pokeCollection/pack',
          {
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
              trainerId: data._id,
              packType: 'starter'
            })
          }
        )
      }
      )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNewPack(data.map(pokemon => {
          return pokemon.sprite;
        }));
      })
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && input) {
      handleClick();
    }
  }

  return (
    <>
      {
        !newTrainerSubmitted &&
        <div className='new-trainer-needed-section'>
          <div className='new-trainer-needed-message'> Do you want to be the very best, the best there ever was? <br />
          Get started by entering your pokemon trainer name.
        </div>
          {
            newTrainerNeededError &&
            <div className='new-trainer-needed-error'>
              {newTrainerNeededError}
            </div>
          }
          <input className='new-trainer-input-input'
            onChange={handleChange}
            type='text'
            value={input}
            placeHolder='Enter Trainer Name'
            onKeyDown={handleKeyDown}
          />
          <button className='new-trainer-input-button'
            onClick={handleClick}
            // do we need trainer?
            disabled={!input || !!trainer}
          >
            Enter
        </button>
        </div>
      }
      {
        newTrainerSubmitted &&
        <div className='new-trainer-created-welcome'>
          Welcome, <b>{trainer.name}</b>!<br />
        We've given you a starter pack of Pokemon to get you ready! Have a look.<br />
          {newPack.map(sprite => { return <img src={sprite}></img> })} <br />
        Now go, go and catch those Pokemon!
      </div>
      }
    </>
  )

}

export default NewTrainer;