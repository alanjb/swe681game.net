import * as http from 'http';
import * as debug from 'debug';
import App from './App';
import AccessMonitor from './control-layer/services/AccessMonitor';
import { accessMonitor } from './control-layer/models/acessMonitor';
import * as mongoose from 'mongoose';

/**
 * Container Control Layer - certain security measures must be completed before moving to the next layer: Application Security layer
 * 
 * In order to get from one container to the next in the docker-defined container network, 
 * multi-factored authentication is required to be . This is much more secure since the probably of a malicious hacker
 * container in their possession each key to unlock each secured container. For sufficient security, a user of the system
 * when creating their profile must add about 3-6 
 * 
 * 
 * Each container runs a nodejs environment which will run in a single core of a CPU. Therefore, we ca have multiple 
 * containers, each powered by a single core in a CPU. 
*/

//an IIFE: Immediately Invoked Function Expression - create a functional wrapper
(function(global) {
    const accessMonitor: accessMonitor;
    const portMonitor: portMonitor;

    init();

    function init() {
        //go through pipeline
        startAccessMonitor().then(isCreated => {
            if (!isCreated) {
                //turn off the program
                throw new Error('Error: Failed to start Access Monitor. Goodbye.');
            }
            
            //isRoot and correct IP?
            //promise all with isRoot and correct IP/Mac address of machine
            accessMonitor.ensureCallerIsRoot().then(isRoot => {
                if (!isRoot) {
                    throw new Error('Error: not root. Goodbye.')
                }

                //go to next layer? 
                //from control container layer to application security layer
                //start the 8080 port to be opened
                //monitor 

                accessMonitor.ensureCorrectPort().then  

            }).catch(error => {
                throw new Error('Error: cannot execute task.' + error + '...Goodbye.');
            })
        });
    }

    function startAccessMonitor(): Promise<boolean> {
        return getAccessMonitor().then(AccessMonitor => {
            console.log("State of Access Monitor: " + AccessMonitor);
            //is null or undefined here?
            if (AccessMonitor == null) {
                return Promise.resolve(false);
            }
            return Promise.resolve(true);
        }).catch(error => {
            throw new Error('Error: cannot execute task.' + error + '...Goodbye.');
        });
    }

    function getAccessMonitor(): Promise<AccessMonitor> {
        //will return new Object and return it
        return AccessMonitor.create().then(accessMonitor => {
            if (AccessMonitor == null) {
                return Promise.resolve(null);
            }

            this.accessMonitor = accessMonitor;
            return Promise.resolve(AccessMonitor);
        }).catch(error => {
            throw new Error('Error: cannot execute task. Goodbye.')
        });
    }


    
    //Promise to create access monitor
    // const accessMonitor = AccessMonitor.create();

    //call 

    //ensure current system operator is the root - we don't want sub-users to be able to start the application in anyway. 
    //For example, given a malicious user who gains entry into the machine's operating system and has the ability to run the application 
    //with an e.However, the data they are looking
    //for is only accessible . This is accomplished by calling the script with the IIFE to check if the caller is root. 

    //call bash script - will use the child_process module
    
    //use promise.all here or, use pipeline of promise calls where each call is only executed if the call before has been executed

    //start: temporary whitelist given port (should be randomized possibly, for now use static integer)
    

    // require('dotenv').config(); in other application, don't need access to global variables so don't call it. 

    initPort(); // don't init ports right away

    //monitor - https://www.2daygeek.com/bash-shell-script-view-linux-system-information/
})(this);


/*
*   need to check a few things before this is called. First, ensure root is calling this script
*/

//https://philipwalton.com/articles/implementing-private-and-protected-members-in-javascript/
private function initPort() {
    // const globalPortDef = normalizePort(process.env.PORT);
    // const localPortDef = '8081';
    


    
}

/** 
 * Contract
 * 
 * EXPECTS: 
 * 
 * **/
function ensureCallerIsRoot() {
    //call os and check if caller of script is root user. 
    const { exec } = require("child_process");
    let isRoot: boolean;

    exec('./control-layer/scripts/control.sh', (error, stdout, stderr) => {
        if (error) {
            isRoot = false;
            throw new Error('Error: Failed to connect.'); 
        }

        if (!stderr) {
            isRoot = false;
            throw new Error('Not root. Goodbye.'); 
        }

        if (stdout) {
            isRoot = true;
        }

    });
    
    return isRoot;
    
}
// debug('ts-express:server');

//whitelist port 8080 to be used as the only port for this web service

//TODO: need to handle unexpected behavior here. 
//TODO: need to connect to DB once this passes
try {

    return Promise
        .all([
            device.put()
    //   projectApi.get(fetchedPage.projectId),
    //   pageLockApi.exists(id),
    //   selfBookmarkApi.existsForPage(id),
    //   pageApi.getPageFeedback(id)
    ])
    //make async calls
    return ensureCorrectPortNumber()
        .then(isCorrectPort, () => {
        
        })
        .catch(error){
            console.log
        }
    //docker handles mapping
    // mongoose.connect('mongodb://mongodb:27017/device_db', { useNewUrlParser: true })
} catch (error) {
    console.log(error);
}

const server = http.createServer(App);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error!'))
db.once('open', () => {
    console.log('DB connected!')
});

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
    console.log('Ensuring that application is connecting to designated port...');

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


