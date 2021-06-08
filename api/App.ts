import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import DeviceManagerController from './device-manager/DeviceManagerController';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  private express: express.Application;
  private deviceManagerController: DeviceManagerController;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.deviceManagerController = new DeviceManagerController();
  }

  public static createApp() {
    return new App().express;
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({extended: false}))
    this.express.use(function(req: any, res: any, next: any) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    })
  }

  //Configure API endpoints
  private routes(): void {
    const { express } = this;

    express.post('/device-manager', (req: any, res: any) => {
      // console.log(req);
      this.deviceManagerController.powerOff()
        .then((response: any) => {
          res.json(response);
        })
        .catch((error: any) => {
          console.log(error)
        })
    });
  }
}

export default App;