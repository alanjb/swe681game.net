"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.PlayerSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Card_1 = require("./Card");
exports.PlayerSchema = new mongoose_1.default.Schema({
    id: String,
    folded: Boolean,
    isDealer: Boolean,
    points: Number,
    hand: [Card_1.CardSchema],
});
exports.Player = mongoose_1.default.model("Player", exports.PlayerSchema);
