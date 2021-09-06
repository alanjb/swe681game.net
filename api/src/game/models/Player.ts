import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  currentHand: {
    type: [],
    default: [],
  }
});

const Player = mongoose.model("Player", PlayerSchema);

export default Player;