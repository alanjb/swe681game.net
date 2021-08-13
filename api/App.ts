import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import DeviceManagerController from './device-manager/DeviceManagerController';

// Creates and configures an Node web server. Prevents sub-typing of this class.
class App {

  // ref to Express instance
  private static app: express.Application;

  private static deviceManagerController = new DeviceManagerController();

  //Run configuration methods on the Express instance by building 
  public static buildApp() {
    console.log("Starting build...");

    this.initExpress();
    this.initMiddleware();
    this.initRoutes();
    
    return this.start();
  }

  //check auth here in server cache 
  private static initExpress() {
    console.log("Creating node application...");
    this.app = express();
  }

  // Configure Express middleware.
  private static initMiddleware(): void {
    console.log("Initializing application middleware...");

    if (this.app) {
      this.app.use(logger('dev'));
      this.app.use(cors())
      this.app.use(express.urlencoded({ extended: true }))
      this.app.use(express.json());
      this.app.use(function (req: any, res: any, next: any) {
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
      });
    }
  }

  private static initRoutes() {
    console.log("Initializing application routes...");

    const { app, deviceManagerController } = this;

    app.post("/device-manager/powerOff",  (req: any, res: any) => {
      const deviceId: string = req.body.deviceId;
      const farmAddress: string = req.body.farmAddress; 

      console.log("Device ID: " + deviceId);
      console.log("Root Node Address: " + farmAddress);

      return deviceManagerController
        .powerOff(deviceId, farmAddress)
        .then((response: any) => {
          console.log('')
          res.json({
            isPoweredOff: response
          });
        })
        .catch((response: any) => {
          console.log("Error: Failed to connect...")
          res.status(400).json({
            isPoweredOff: response
          });
        })
    });
  }

  private static start() {
    if (this.app) {
      return this.app;
    }
  }
}

export default App;