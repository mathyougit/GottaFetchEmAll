import React from 'react';
import NewTrainer from '../Components/NewTrainer/NewTrainer';
import WelcomeMessage from '../Components/WelcomeMessage/WelcomeMessage';
import NewPack from '../Components/NewPack/NewPack';
import TrainerCollection from '../Components/TrainerCollection/TrainerCollection';

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

  handleNewTrainer = ({ newTrainerNeededChange, newTrainerSubmittedChange, newTrainer }) => {
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
          this.state.trainer &&
          <div className='trainer-section'>
          <WelcomeMessage
              newOrReturningTrainer={this.state.newTrainerSubmitted ? 'new' : 'returning'}
              trainerName={this.state.trainer.name}
            />
            <div className='new-pack-section'>
              Add more Pokemon to your collection in order to <i>fetch them all</i>!
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
            <TrainerCollection
              pokeCollection={this.state.trainer.pokecollection}
            />
          </div>
        }
      </div>
    );
  };

};

export default Main;