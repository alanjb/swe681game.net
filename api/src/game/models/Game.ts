import mongoose, { Schema } from 'mongoose';
import { PlayerSchema } from "./Player";
import { CardSchema } from "./Card";

//add validation here 
export const GameSchema = new Schema({
  id: String,
  pot: Number,
  roundCount: Number,
  status: String,
  players: [{ players: [PlayerSchema] }],
  deck: [{ cards: [CardSchema] }]
});

export const Game = mongoose.model("Game", GameSchema);