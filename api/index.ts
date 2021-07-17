import App from './App';
import dotenv from 'dotenv';
import https from 'https';
import http from 'https';
import fs from 'fs';

//access to environment variables
dotenv.config({ path: './config/.env' });

const HTTPS_PORT = process.env.HTTPS_PORT;
const HTTP_PORT = process.env.HTTP_PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;
const app = App.buildApp();

let server = null;

if (ENVIRONMENT === 'DEV') {
    server = http.createServer(app);
} else {
    const privateKey = fs.readFileSync('/etc/pki/tls/private/privkey.key', 'utf8');
    const certificate = fs.readFileSync('/etc/pki/tls/certs/custom.crt', 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    server = https.createServer(credentials, app);
}

app.get('/login', (req, res) => {
    res.send('hello')
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged Out');
})

app.listen(HTTP_PORT, () => {
    console.log(`Example app listening at http://localhost:${HTTP_PORT}`
        
  )
})

//now listening for client requests 
// server.listen(process.env.ENVIRONMENT === 'DEV' ? HTTP_PORT : HTTPS_PORT);

// server.on('listening', () => {
//     const addr = server.address();
//     const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

//     console.log('HTTP Listening on ' + bind)
// });
