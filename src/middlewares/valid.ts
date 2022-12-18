// const CreateError = require('http-errors');
import CreateError from 'http-errors';
import errorLib from '../libs/http-responses';
const { badValid } = errorLib;
import { Request, Response, NextFunction } from 'express';
const validation = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw CreateError(badValid.code, badValid.status(error));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default validation;
