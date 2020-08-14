import React from 'react';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      error: '',
      newTrainerNeeded: false,
      newTrainerSubmitted: false,
      trainer: null,
      newPack: []
    }
  }

  componentDidMount() {
    const returningTrainerId = localStorage.getItem('pokemonTrainerId');
    const newTrainerNeeded = !returningTrainerId ? true : false;
    // this state change will tell the new trainer section to render
    newTrainerNeeded && this.setState(() => ({
      newTrainerNeeded,
    }))

    !newTrainerNeeded && fetch(`https://gottafetchemall.herokuapp.com/trainer/${returningTrainerId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        method: 'GET',
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
    // this state change will tell the returning trainer section to render
        this.setState(() => ({
          trainer: data,
        }))
      })
  }
 
  handleChange = e => {
    const input = e.target.value;
    this.setState(() => ({ input }));
  }

  handleClick = () => {
    
    // how to allow other UTF-8 chars?
    if(!/^[a-z0-9]+$/i.test(this.state.input)) {
      this.setState(() => ({
        newTrainerError: `Invalid Name: ${this.state.input}. Please only use alphanumeric characters for your trainer name.`,
        input: ''
      }))
    return
      }
    fetch('https://gottafetchemall.herokuapp.com/trainer',
      {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: this.state.input })
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        localStorage.setItem('pokemonTrainerId', data._id)
        this.setState(() => ({
          newTrainerNeeded: false,
          newTrainerSubmitted: true,
          trainer: data,
          input: ''
        }))
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
        const newPack = data.map(pokemon => {
          return pokemon.sprite;
        });
        this.setState(() => ({
          newPack,
        }))
      })
  }

  handleKeyDown = e => {
    if (e.key === 'Enter' && this.state.input) {
      this.handleClick();
    }
  }

  // State control? What if user manually changes state. How to prevent this from making changes
  // Make the new trainer section a function / or component
  // Make component for rendering pokemon and sprite
  // click on pokemon sprite to evolve
  // sort methods: rarity, alphabetical, num of same pokemon
  // ctrl-s to sort sa for alpha, r by rarity
  // pokedex facts for user

  render() {
    return (
      <div className='main'>

        {
          this.state.newTrainerNeeded &&
          <div className='new-trainer-section'>
            <div className='new-trainer-message'> Do you want to be the very best, the best there ever was? <br />
              Get started by entering your pokemon trainer name.
            </div>
            {
              this.state.newTrainerError &&
              <div className='new-trainer-error'>
                {this.state.newTrainerError}
              </div>
            } 
            <input className='input-input'
              onChange={this.handleChange}
              type='text'
              value={this.state.input}
              placeHolder='Enter Trainer Name'
              onKeyDown={this.handleKeyDown}
            />
            <button className='input-button'
              onClick={this.HandleClick}
              disabled={!this.state.input || !!this.state.trainer}
            >
              Enter
            </button>
          </div>
        }
        {
          this.state.newTrainerSubmitted &&
          <div className='new-trainer-welcome'>
            Welcome, <b>{this.state.trainer.name}</b>!<br />
            We've given you a starter pack of Pokemon to get you ready! Have a look.<br/>
            {this.state.newPack.map(sprite => { return <img src={sprite}></img> })} <br/>
            Now go, go and catch those Pokemon!
          </div>
        }
        {
          !this.state.newTrainerSubmitted && this.state.trainer &&
          <div className='returning-trainer-welcome'>
            Welcoem Back, <b>{this.state.trainer.name}</b>!<br/>
            Have a look at your Pokemon! <br/>
            {this.state.trainer.pokecollection.pokemons.map(pokemon => { return <img src={pokemon.sprite}></img> })}
          </div>
        }

      </div>
    );
  };

};

export default Main;