class GameController {
  public create(game) {
    return game
      .save()
      .then((response) => {
        console.log("Database save success - GAME CREATED: " + response);
        return response;
      })
      .catch((response) => {
        console.log("Database save error - GAME NOT CREATED: " + response);
        return response;
      }) 
  }

  public discard(card) {
    return card
      .remove()
      .then((response) => {
        console.log("Database remove success - Card DISCARDED: " + response);
        return response;
      })
      .catch((response) => {
        console.log("Database save error - Card NOT DISCARDED " + response);
        return response;
      }) 
  }
}

export default GameController;