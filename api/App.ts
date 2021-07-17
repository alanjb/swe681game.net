import express from 'express';
import logger from 'morgan';
import DeviceManagerController from './device-manager/DeviceManagerController';
import { auth, requiresAuth } from 'express-openid-connect';

// Creates and configures an ExpressJS web server. Prevents sub-typing of this class.
class App {

  // ref to Express instance
  private static app: express.Application;

  // ref to device manager controller
  private static deviceManagerController: DeviceManagerController;

  //Run configuration methods on the Express instance by building 
  public static buildApp() {
    this.initExpress();
    this.middleware();
    this.deviceManagerController = new DeviceManagerController();
    this.routes();
    
    return this.start();
  }

  //check auth here in server cache 
  private static initExpress() {
    this.app = express();
  }

  // Configure Express middleware.
  private static middleware(): void {
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
          clientID: CLIENT_ID ,
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

  //Configure API endpoints
  private static routes(): void {
    const { app, deviceManagerController } = this;

    app.get('/', (req, res) => {
      console.log("test")
      res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged Out');
    })

    app.get('/dashboard', requiresAuth(), (req, res) => {
      res.send(JSON.stringify(req.oidc.user));
    })

    //need ID of device here
    app.post('/device-manager/:id', requiresAuth(), (req: any, res: any) => {
      const deviceId = req.query.id;
      const farmAddress: string = req.body.farmAddress; 

      console.log('Device ID: ' + deviceId);
      console.log('LAN Root Address: ' + farmAddress);

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
    const { app } = this;
    if (app) {
      return app;
    }
  }
}

export default App;