import React from 'react';
import NewTrainer from '../Components/NewTrainer/NewTrainer';
import WelcomeMessage from '../Components/WelcomeMessage/WelcomeMessage';
import NewPack from '../Components/NewPack/NewPack';

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
        this.setState(() => ({
          trainer: data,
        }))
      })
  }

  handleNewTrainer = ({newTrainerNeededChange, newTrainerSubmittedChange, newTrainer}) => {
    localStorage.setItem('pokemonTrainerId', newTrainer._id)
    this.setState({
      newTrainerNeeded: newTrainerNeededChange,
      newTrainerSubmitted: newTrainerSubmittedChange,
      trainer: newTrainer,
    })
  }

  handleNewPack = () => {
    fetch(`https://gottafetchemall.herokuapp.com/trainer/${this.state.trainer._id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        method: 'GET'
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        trainer: data,
      })
    })
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
          <NewTrainer 
          handleNewTrainer={this.handleNewTrainer}
          />
        }
        {
          // can group all three of the below components to show up if this.state.trainer exists
          this.state.trainer &&
          <WelcomeMessage
          newOrReturningTrainer={this.state.newTrainerSubmitted ? 'new' : 'returning'}
          trainerName={this.state.trainer.name}
          />
        }


        {
          this.state.trainer &&
          <div className='new-pack-section'>
          <NewPack
            trainerId={this.state.trainer._id}
            packType={'basic'}
            packPrice={1}
            handleNewPack={this.handleNewPack}
          />
          <NewPack
            trainerId={this.state.trainer._id}
            packType={'premium'}
            packPrice={2}
            handleNewPack={this.handleNewPack}
          />
          </div>
        }
        {
          // turn this into component
          this.state.trainer &&  
          <div className='trainer-pokemon-collection'>
            Have a look at your Pokemon! <br />
            {this.state.trainer.pokecollection.pokemons.map(pokemon => { return <img src={pokemon.sprite}></img> })}
          </div>
        }
      </div>
    );
  };

};

export default Main;