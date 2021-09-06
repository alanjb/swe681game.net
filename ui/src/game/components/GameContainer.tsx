import React, { Component, Fragment } from 'react';
import axios from 'axios';

class DeviceManagerContainer extends Component {
  render() {
    return (
      <Fragment>
          <div id="game-container">
            Game Container 
          </div>
          <div>
            <button onClick={discardSelectedCards}>
              Discard selected cards
            </button>
          </div>
      </Fragment>
    );
  }
}

function discardSelectedCards() {
  console.log('Discard selected cards...')

  const selectedCardsToDiscard = ['Ace of Spades', 'King of Hearts'];

  //get other settings - use a create new game modal 
  axios
    .delete(`http://localhost:8000/api/player/deck/discard`, {data: selectedCardsToDiscard})
    .then(res => {
      if(res.data){
        console.log('Selected cards deleted...')
      }
    })
    .catch(error => {
      alert("Error! Failed to create game: " + error);
    })
}

export default DeviceManagerContainer;