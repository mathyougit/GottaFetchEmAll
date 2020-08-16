import React from 'react';


const WelcomeMessage = (props) => {

  const newOrReturningTrainer=props.newOrReturningTrainer;
  const trainerName=props.trainerName

  return (
    <div className='welcome-message'>
      {
        newOrReturningTrainer==='new' &&
        <div>
          Welcome, <b>{trainerName}</b>!<br />
          We've given you a starter pack of Pokemon to get you ready!<br />
        </div>
      }
      {
        newOrReturningTrainer==='returning' &&
        <div>
          Welcome Back, <b>{trainerName}</b>!
        </div>
      }
    </div>
  )

}

export default WelcomeMessage;