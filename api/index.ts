import App from './app';
import dotenv from 'dotenv';
import http from 'http';

//set environment variables
dotenv.config({ path: './config/.env' });

//get whitelisted port from local env file
const port = process.env.PORT;

//build App with given port
const app = App.buildApp(port);

//create http server to  - should be async 
const server = http.createServer(app);

//now listening for client requests 
server.listen(port);

server.on('listening', () => {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    console.log('Listening on Port: ' + bind)
});