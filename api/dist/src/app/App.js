"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const GameController_1 = __importDefault(require("../game/GameController"));
const Game_1 = require("../game/models/Game");
const Card_1 = require("../game/models/Card");
const utils_1 = require("./utils");
// Creates and configures an Node web server. Prevents sub-typing of this class.
class App {
    //Run configuration methods on the Express instance by building 
    static buildApp() {
        console.log("Starting build...");
        this.initExpress();
        this.initMiddleware();
        this.initDatabase();
        this.initRoutes();
        return this.start();
    }
    static initExpress() {
        console.log("Creating node application...");
        this.app = (0, express_1.default)();
    }
    // Configure Express middleware.
    static initMiddleware() {
        console.log("Initializing application middleware...");
        if (this.app) {
            this.app.use((0, morgan_1.default)('dev'));
            this.app.use((0, cors_1.default)());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use(express_1.default.json());
            this.app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
                res.header("Access-Control-Allow-Headers", "Content-Type");
                next();
            });
        }
    }
    static initDatabase() {
        console.log("Initializing database...");
        const mongoDB = process.env.CONNECTION_STRING;
        const mongoose = require('mongoose');
        const db = mongoose.connection;
        mongoose
            .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
            console.log("Successfully initialized database...running at " + mongoDB);
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        })
            .catch(error => {
            console.log("Error: " + error);
        });
    }
    static initRoutes() {
        console.log("Initializing application routes...");
        const { app, gameController } = this;
        app.get('/', (req, res) => {
            res.send('swe681-game.net');
        });
        app.get('/api', (req, res) => {
            res.send('swe681-game.net/api');
        });
        app.post("/api/game/create", (req, res) => __awaiter(this, void 0, void 0, function* () {
            //validate req.body data 
            const newGame = new Game_1.Game({
                players: req.body.game.players,
                requiredPointsPerPlayer: req.body.game.requiredPointsPerPlayer,
                antiAmount: req.body.game.antiAmount
            });
            console.log(newGame);
            // return gameController
            //   .create(newGame)
            //   .then((game) => {
            //     console.log("Success: Created new game..." + game);
            //     res.json({
            //       isGameCreated: true,
            //       game: game
            //     })
            //   })
            //   .catch((error) => {
            //     console.log("Error: Failed to create game..." + error);
            //     res.json({
            //       isGameCreated: false
            //     })
            //   });
        }));
        app.delete("/api/player/deck/discard", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cardsToDiscard = req.body;
            yield cardsToDiscard
                .forEach(card => {
                const cardType = card.face + ' of ' + card.suit;
                if (cardType.match(utils_1.CARD_REGEX)) {
                    const cardToDiscard = new Card_1.Card({ id: card.id, face: card.face, suit: card.suit });
                    gameController
                        .discard(cardToDiscard)
                        .then(response => {
                        // console.log(response, 'discarded...')
                    })
                        .catch(error => {
                        console.log(error);
                    });
                }
                else {
                    console.log('ERROR! Regex match failed.');
                }
            });
        }));
    }
    static start() {
        if (this.app) {
            return this.app;
        }
    }
}
App.gameController = new GameController_1.default();
exports.default = App;
