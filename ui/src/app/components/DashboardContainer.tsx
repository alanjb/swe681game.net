import React, { Component, Fragment } from 'react';
import axios from 'axios';
import history from '../routing/history';

class DeviceManagerContainer extends Component {
  render() {
    return (
      <Fragment>
          <div id="dashboard-container">
            SWE681 game dashboard
          </div>
          <div>
            <button onClick={this.createGame}>
              Create new game
            </button>
          </div>
      </Fragment>
    );
  }

  createGame() {
    console.log('creating game...');
  
    const playersArray = ['john@gmail.com', 'jim@gmail.com'];
  
    //get other settings - use a create new game modal 
  //   axios
  //     .post(`http://localhost:8000/api/game/create`, {playersArray: playersArray})
  //     .then(res => {
  
  //       if(res.data){
  //         // const { history } = this.props;
  //         const { gameId } = res.data;
  //         //redirect to GameContainer using router and game id
  //         alert("Starting game...redirecting... ");
  //         history.push(`/game/${gameId}`);
  //       }
  //     })
  //     .catch(error => {
  //       alert("Error! Failed to create game: " + error);
  //     })
  }
}

export default DeviceManagerContainer;