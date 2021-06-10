import express from 'express';
import logger from 'morgan';
import DeviceManagerController from './device-manager/DeviceManagerController';

// Creates and configures an ExpressJS web server. Prevents sub-typing of this class.
class App {

  // ref to Express instance
  private static app: express.Application;

  // ref to device manager controller
  private static deviceManagerController: DeviceManagerController;

  //Run configuration methods on the Express instance by building 
  public static buildApp(port: string) {
    //some sort of check here for security
    if (!port) {
      console.log('Error: No Port.');
    }

    this.initExpress(); //this should be checked for correct init. async. Promise all
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
      const farmAddress: string = req.body.farmAddress;

      console.log('Device ID: ' + deviceId)
      console.log('Farm Address: ' + farmAddress)

      //req will have device data needed to make call like remote server location, device id
      deviceManagerController.powerOff(deviceId, farmAddress)
        .then(() => {
          res.json(true);
        })
        .catch((error: any) => {
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