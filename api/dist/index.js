"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config/.env' });
const port = process.env.PORT;
const app = app_1.default.createApp();
app.set('port', port);
const server = http_1.default.createServer(app);
server.listen(port);
server.on('listening', () => {
    console.log('Listening on port ' + port);
});
