const mongoose = require('mongoose');

//add validation here 
const GameSchema = new mongoose.Schema({
  players: {
    type: Array,
    default: [],
  },
  numPlayers: Number
});

const Game = mongoose.model("Game", GameSchema);

export default Game;