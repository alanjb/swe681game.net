import express from 'express';
import logger from 'morgan';
import DeviceManagerController from './device-manager/DeviceManagerController';
import { auth } from 'express-openid-connect';

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
    if (this.app) {
      this.app.use(
        auth({
          issuerBaseURL: 'https://YOUR_DOMAIN',
          baseURL: 'https://YOUR_APPLICATION_ROOT_URL',
          clientID: 'YOUR_CLIENT_ID',
          secret: 'LONG_RANDOM_STRING',
          idpLogout: true,
        })
      );
      this.app.use(logger('dev'));
      this.app.use(express.urlencoded({ extended: true }))
      this.app.use(express.json());
      this.app.use(function (req: any, res: any, next: any) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      });

    }
  }

  //Configure API endpoints
  private static routes(): void {
    const { app, deviceManagerController } = this;

    app.post('/device-manager', (req: any, res: any) => {
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
    const { app } = this;
    if (app) {
      return app;
    }
  }
}

export default App;