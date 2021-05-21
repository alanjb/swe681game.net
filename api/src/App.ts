import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application

  //Run configuration methods on the Express instance.
  constructor() {
    this.init();
    this.middleware();
    // this.routes();
  }

  private init() {
    this.express = express();
  }

  // Configure Express middleware.
  private middleware(): void {
    const { express } = this;

    //turn these into promises to ensure that all middleware was configured properly (use method verification)
    express.use(logger('dev'));
    express.use(bodyParser.json());
    express.use(bodyParser.urlencoded({ extended: false }));
    express.use(cookieParser());
    express.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    })
  }

  // Configure API endpoints.
  private routes(): void {
    const { express } = this;

    express.use('/', require('./device/DeviceController'));
  }

  private db(): void {

  }

}

export default new App().express