"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameController {
    create(game) {
        return game
            .save()
            .then((response) => {
            console.log("Database save success - GAME CREATED");
            return response;
        })
            .catch((response) => {
            console.log("Database save error - GAME NOT CREATED");
            return response;
        });
    }
    discard(card) {
        return card
            .remove()
            .then((response) => {
            console.log("Database remove success - Card DISCARDED");
            return response;
        })
            .catch((response) => {
            console.log("Database save error - Card NOT DISCARDED");
            return response;
        });
    }
}
exports.default = GameController;
