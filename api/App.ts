import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import deviceController from './control/DeviceController';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  private deviceController;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express()
    this.middleware()
    this.routes()
    this.deviceController = deviceController;
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({extended: false}))
    this.express.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    })
  }

  // Configure API endpoints.
  private routes(): void {
    const { express } = this;

    express.use('/', () => {
      
    });
    
  }

}

export default App;