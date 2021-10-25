import mongoose from "mongoose";

export const PlayerSchema = new mongoose.Schema({
  id: String,
  folded: Boolean,
  isDealer: Boolean,
  points: Number,
  hand: [],
});

export const Player = mongoose.model("Player", PlayerSchema);