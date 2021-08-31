import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import GameController from './src/game/game/GameController';

// Creates and configures an Node web server. Prevents sub-typing of this class.
class App {

  // refs to Express instance and game controller objects
  private static app: express.Application;
  private static gameController = new GameController();

  //Run configuration methods on the Express instance by building 
  public static buildApp() {
    console.log("Starting build...");

    this.initExpress();
    this.initMiddleware();
    this.initRoutes();
    
    return this.start();
  }

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

    const { app, gameController } = this;

    app.get('/', (req, res) => {
      res.send('swe681-game.net')
    });

    app.get('/api', (req, res) => {
      res.send('swe681-game.net/api')
    });

    app.post("/api/game/create",  (req: any, res: any) => {
      console.log("Creating game...");

      return gameController.create();
    });
  }

  private static start() {
    if (this.app) {
      return this.app;
    }
  }
}

export default App;