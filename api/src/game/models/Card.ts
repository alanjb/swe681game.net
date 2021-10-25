import mongoose, { Schema } from "mongoose";

export const CardSchema = new Schema({
  face: {
    type: String,
  },
  suit: {
    type: String,
  }
});

export const Card = mongoose.model("Card", CardSchema);