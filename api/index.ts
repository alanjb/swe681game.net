import App from './App';
import dotenv from 'dotenv';
import http from 'http';
import https from 'https';
import fs from 'fs';

//access to environment variables
dotenv.config({ path: './config/.env' });

const HTTP_PORT = process.env.HTTP_PORT;
const HTTPS_PORT = process.env.HTTPS_PORT;

//read private key - should be an env variable or dynamically set (ec2-user as ex.)
const privateKey = fs.readFileSync('/etc/pki/tls/private/privkey.key', 'utf8');

//read private key 
const certificate = fs.readFileSync('/etc/pki/tls/certs/custom.crt', 'utf8');

//create credentials object, should build a type for this
const credentials = { key: privateKey, cert: certificate };

//build App with given port
const app = App.buildApp();

const httpServer = http.createServer(app);

const httpsServer = https.createServer(credentials, app);

//now listening for client requests 
httpServer.listen(HTTP_PORT);

//now listening for client requests 
httpsServer.listen(HTTPS_PORT);

//output port in usage
httpsServer.on('listening', () => {
    const addr = httpsServer.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    console.log('Listening on ' + bind)
});