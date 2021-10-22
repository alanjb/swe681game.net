import React, { Component, Fragment } from 'react';
import axios from 'axios';

class DeviceManagerContainer extends Component {

  render() {
    return (
      <Fragment>
        <div className="game-board-container container">
          <div className="chip-pot-container">
          pot
            <div className="pot">
              
            </div>
          </div>
            {/* <button onClick={this.discardSelectedCards}>
              Discard selected cards
            </button> */}
              <div className="user-player-container"> 
                player 1
              </div>
              
              <div className="user-player-container"> 
                player 1
              </div>
          </div>
      </Fragment>
    );
  }

  discardSelectedCards = () => {
    console.log('Discard selected cards...')

    const selectedCardsToDiscard = [{ id: 123, face: 'Ace', suit: 'Spades'}];
  
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
}

export default DeviceManagerContainer;