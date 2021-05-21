import { Model } from "mongoose";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export var DeviceSchema: Schema = new Schema({
  id: String,
  code: String,
  expiration: Date,
  valid: Boolean,
}, {
  timestamps: true
})

export const Transaction: Model<ITransactionModel> = model<ITransactionModel>("Transaction", TransactionSchema);