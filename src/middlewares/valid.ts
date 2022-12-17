// const CreateError = require('http-errors');
import CreateError from 'http-errors';
import errorLib from '../libs/http-responses';
const { badValid } = errorLib;

const validation = (schema: any) => {
  return async (req: any, res: any, next: any) => {
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
