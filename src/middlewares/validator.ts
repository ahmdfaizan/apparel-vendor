import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const reqValidator = function (validator: Joi.Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await validator.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: (<Error>error).message });
    }
  };
};
