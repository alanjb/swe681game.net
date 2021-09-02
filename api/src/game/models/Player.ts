import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  currentCardsInHand: {
    type: Array,
    default: [],
  }
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;