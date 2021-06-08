import http from 'http';
import App from './app';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const port = process.env.PORT;
const app = new App().express;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
    console.log('Listening on port ' + port);
});