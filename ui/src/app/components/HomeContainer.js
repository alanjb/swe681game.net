import React, { Fragment } from "react";
import axios from 'axios';
import history from '../routing/history';

const HomeContainer = () => (
  <Fragment>
    Welcome to SWE681 game home page
    <button onClick={createGame}>
      Create a game
    </button>
  </Fragment>
);

function createGame() {
  console.log('creating game...')
  //use env variables to config this network call

  const playersArray = ['john@gmail.com', 'jim@gmail.com'];

  //get other settings
  axios
    .post(`http://localhost:8000/api/game/create`, {playersArray: playersArray})
    .then(res => {

      console.log(res.data)

      if(res.data){
        // const { history } = this.props;
        const { gameId } = res.data;
        //redirect to GameContainer using router and game id
        alert("Starting game...redirecting... ");
        history.push(`/game/${gameId}`);
      }
    })
    .catch(error => {
      alert("Error! Failed to create game: " + error);
    })
}

export default HomeContainer;