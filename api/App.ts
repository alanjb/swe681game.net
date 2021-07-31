import express from 'express';
import logger from 'morgan';
import DeviceManagerController from './device-manager/DeviceManagerController';
import { auth, requiresAuth } from 'express-openid-connect';
import path from 'path';

// Creates and configures an Node web server. Prevents sub-typing of this class.
class App {

  // ref to Express instance
  private static app: express.Application;

  private static deviceManagerController: DeviceManagerController;

  //Run configuration methods on the Express instance by building 
  public static buildApp() {
    console.log('Building app...');

    this.initExpress();
    this.initMiddleware();
    this.initRoutes();
    
    return this.start();
  }

  //check auth here in server cache 
  private static initExpress() {
    console.log('Creating node...');
    this.app = express();
  }

  // Configure Express middleware.
  private static initMiddleware(): void {
    console.log('Initializing application middleware...');

    const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL;
    const CLIENT_ID = process.env.CLIENT_ID;
    const PROD_BASE_URL = process.env.PROD_BASE_URL;
    const DEV_BASE_URL = process.env.DEV_BASE_URL;
    const SECRET = process.env.SECRET;

    if (this.app) {
      this.app.use(
        auth({
          authRequired: false,
          auth0Logout: true,
          issuerBaseURL: ISSUER_BASE_URL,
          baseURL: process.env.ENVIRONMENT === 'DEV' ? DEV_BASE_URL : PROD_BASE_URL,
          clientID: CLIENT_ID,
          secret: SECRET,
          idpLogout: true,
        })
      );
      this.app.use(logger('dev'));
      this.app.use(express.urlencoded({ extended: true }))
      this.app.use(express.json());
      this.app.use(function (req: any, res: any, next: any) {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      });
    }
  }

  private static initRoutes() {
    console.log('Initializing application routes...');

    const { app, deviceManagerController } = this;

    app.get('/device-manager', requiresAuth(), (req, res) => {
      res.send("User logged in: " + JSON.stringify(req.oidc.user));
    });

    app.post('/device-manager',  (req: any, res: any) => {
      const deviceId: string = req.body.deviceId;
      const farmAddress: string = req.body.farmAddress; //static ip or subdomain

      console.log('Device ID: ' + deviceId)
      console.log('LAN Root Address: ' + farmAddress)

      //req will have device data needed to make call like remote server location, device id
      return deviceManagerController.powerOff(deviceId, farmAddress)
        .then((response) => {
          res.json(response);
        })
        .catch((error: any) => {
          console.log('Failure at control layer: ' + error)
          res.json(false);
        })
    });
  }

  private static start() {
    console.log('Starting application...');

    const { app } = this;
    if (app) {
      return app;
    }
  }
}

export default App;