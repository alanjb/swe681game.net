import App from './App';
import dotenv from 'dotenv';
import http from 'http';

//set environment variables
dotenv.config({ path: './config/.env' });

//get whitelisted port from local env file
const PORT = process.env.PORT;

//build App with given port
const app = App.buildApp(PORT);

//create http server to  - should be async 
const server = http.createServer(app);

//now listening for client requests 
server.listen(PORT);

server.on('listening', () => {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    console.log('Listening on ' + bind)
});