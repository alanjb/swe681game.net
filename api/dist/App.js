"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const DeviceManagerController_1 = __importDefault(require("./device-manager/DeviceManagerController"));
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express_1.default();
        this.middleware();
        this.routes();
        this.deviceManagerController = new DeviceManagerController_1.default();
    }
    static createApp() {
        return new App().express;
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(morgan_1.default('dev'));
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
    }
    //Configure API endpoints
    routes() {
        const { express } = this;
        express.post('/device-manager', (req, res) => {
            // console.log(req);
            this.deviceManagerController.powerOff()
                .then((response) => {
                res.json(response);
            })
                .catch((error) => {
                console.log(error);
            });
        });
    }
}
exports.default = App;
