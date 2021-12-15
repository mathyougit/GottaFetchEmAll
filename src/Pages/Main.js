import React from 'react';
import NewTrainer from '../Components/NewTrainer/NewTrainer';
import WelcomeMessage from '../Components/WelcomeMessage/WelcomeMessage';
import NewPack from '../Components/NewPack/NewPack';
import TrainerCollection from '../Components/TrainerCollection/TrainerCollection';
import TrainerCurrency from '../Components/TrainerCurrency/TrainerCurrency';

const url = process.env.REACT_APP_SERVER;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      error: '',
      newTrainerNeeded: false,
      newTrainerSubmitted: false,
      trainer: null,
    }
  }

  componentDidMount() {
    const returningTrainerId = localStorage.getItem('pokemonTrainerId');
    const newTrainerNeeded = !returningTrainerId ? true : false;
    newTrainerNeeded && this.setState(() => ({
      newTrainerNeeded,
    }))

    !newTrainerNeeded && fetch(`${url}/trainer/${returningTrainerId}`,
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

    // do not need newTrainerSubmittedChange anymore

  handleNewTrainer = ({ newTrainerNeededChange, newTrainerSubmittedChange, newTrainer }) => {
    this.setState({
      newTrainerNeeded: newTrainerNeededChange,
      newTrainerSubmitted: newTrainerSubmittedChange,
      trainer: newTrainer,
    })
    localStorage.setItem('pokemonTrainerId', newTrainer._id);
  }

  handleNewPack = (updateTrainerData) => {
    this.setState({
      trainer: updateTrainerData,
    })
  }

  handleSortedTrainer = (sortedTrainer) => {
    this.setState({
      trainer: sortedTrainer,  
    })
  }

  handleTrainerCurrency = (updatedTrainerData) => {
    this.setState({
      trainer: updatedTrainerData,
    })
  }

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
            <div className='trainer-currency-section'>
              You currently have {this.state.trainer.currency} currency.
              <TrainerCurrency
                trainerId={this.state.trainer._id}
                currency={5}
                handleTrainerCurrency={this.handleTrainerCurrency}
            />
            </div>
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
              trainer={this.state.trainer}
              handleSortedTrainer={this.handleSortedTrainer}
            />
          </div>
        }
      </div>
    );
  };

};

  // State control? What if user manually changes state. How to prevent this from making changes
  // click on pokemon sprite to evolve
  // sort methods: rarity, alphabetical, num of same pokemon
  // ctrl-s to sort sa for alpha, r by rarity
  // pokedex facts for user
  // could highlight pokemon from new pack

export default Main;