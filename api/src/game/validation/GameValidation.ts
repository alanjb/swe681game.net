import joi from "joi";
import { errorFunction } from "../../app/utils";
import { PlayerSchema } from "../models/Player";

const gameCreationPlayerValidation = {
  points: joi.number().integer().min(0)
};

const gameCreationValidation = joi.object({
  requiredPointsPerPlayer: joi.number().greater(0).required(),
  antiAmount: joi.number().greater(0).required(),
  players: joi.array().items(joi.object(gameCreationPlayerValidation)).default([]),
});

//middleware function - https://www.bacancytechnology.com/blog/joi-validation-in-nodejs-and-express
export const gameValidationMiddleware = (req, res, next) => {
  if (req == null) {
    res.status(406);
      
    return res.json(
      errorFunction(true, `Error in User Data: Request Object is Null`)
    );
  }

  else {
    const payload = {
      requiredPointsPerPlayer: req.requiredPointsPerPlayer,
      antiAmount: req.antiAmount,
      players: req.players,
    };
  
    const { error } = gameCreationValidation.validate(payload);
    
    if (error) {
      res.status(406);
      
      return res.json(
        errorFunction(true, `Error in User Data : ${error.message}`)
      );
    }
    else {
      next();
    }
  }
};