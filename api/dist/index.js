"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./src/app/App"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
//access to environment variables
dotenv_1.default.config();
//prod env port
const HTTPS_PORT = process.env.HTTPS_PORT;
//dev env port
const HTTP_PORT = process.env.HTTP_PORT;
//env type
const ENVIRONMENT = process.env.ENVIRONMENT;
//start application
const app = App_1.default.buildApp();
//only create server and controller once app has been built
if (app) {
    let server = null;
    if (ENVIRONMENT === 'DEV') {
        console.log('Creating HTTP server for DEV...');
        server = http_1.default.createServer(app);
    }
    else if (ENVIRONMENT === 'PROD') {
        console.log('Creating HTTPS server for PROD...');
        // const privateKey = fs.readFileSync('/etc/pki/tls/private/privkey.key', 'utf8');
        // const certificate = fs.readFileSync('/etc/pki/tls/certs/custom.crt', 'utf8');
        // const credentials = { key: privateKey, cert: certificate };
        // server = https.createServer(credentials, app);
    }
    if (server) {
        //now listening for client requests 
        server.listen(process.env.ENVIRONMENT === 'DEV' ? HTTP_PORT : HTTPS_PORT);
        server.on('listening', () => {
            const addr = server.address();
            const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
            console.log('Listening on ' + bind + '...');
        });
    }
    else {
        console.log('ERROR loading server. Please reload...');
    }
}
else {
    console.log('ERROR loading app. Please reload...');
}
