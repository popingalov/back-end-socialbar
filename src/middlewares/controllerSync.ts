import sss from '../libs/http-responses';
const { badValid } = sss;
import { Request, Response, NextFunction } from 'express';
const controllerSync = (ctrl: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error: any) {
      if (error.message.includes('validation failed')) {
        error.status = badValid.code;
      }
      next(error);
    }
  };
};

export default controllerSync;
