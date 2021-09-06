import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  face: {
    type: String,
  },
  suit: {
    type: String,
  }
});

const Card = mongoose.model("Card", CardSchema);

export default Card;