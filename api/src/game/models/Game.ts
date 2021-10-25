import mongoose, { Schema } from 'mongoose';
import { PlayerSchema } from "./Player";
import { CardSchema } from "./Card";

//add validation here 
export const GameSchema = new Schema({
  id: String,
  pot: Number,
  roundCount: Number,
  status: String,
  players: [PlayerSchema],
  deck: [CardSchema],
  requiredPointsPerPlayer: Number,
  antiAmount: Number
});

export const Game = mongoose.model("Game", GameSchema);