import * as http from 'http';
import * as debug from 'debug';
import App from './App';

require('dotenv').config();

debug('ts-express:server');

//whitelist port 8080 to be used as the only port for this web service
const port = normalizePort(process.env.PORT);

//TODO: need to handle unexpected behavior here. 
try {
    //make async call 
    ensureCorrectPortNumber();
} catch (error) {
    console.log(error);
}

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

function onError(error: NodeJS.ErrnoException): void {
    //document postconditions 
    if (error.syscall !== 'listen') throw error;

    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch(error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//EXPECTS: @throws IncorrectPortException if incorrect port is designated at runtime
//         else set the port at runtime as the designated application port 
function ensureCorrectPortNumber() {
    console.log('Ensuring that application is connecting to designated port...')

    if (process.env.PORT !== '8080') {
        console.log('Port access denied.');
        //TODO ??? shutoff app?
    }

    //set the application to use one port if port at runtime is correct 
    App.set('port', port);
}

function onListening(): void {
    let address = server.address();
    let bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
    console.log(`Listening on ${bind}`);
}