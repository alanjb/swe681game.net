import GameModel from "./models/Game";

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
}

export default GameController;