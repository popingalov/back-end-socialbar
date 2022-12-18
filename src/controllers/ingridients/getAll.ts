import ingModel from '../../models/ingridient';
const { Ing } = ingModel;
const CreateError = require('http-errors');
import { RootObject } from './ing';
const { ok, notFound } = require('../../libs').HTTP_RESPONSES;
import { Request, Response } from 'express';
const getIng = async (req: Request, res: Response) => {
  const { email } = req.headers;

  const ingList: RootObject = await Ing.find(
    { owner: email },
    '-owner -createdAt -updatedAt',
  );

  if (!ingList) {
    throw new CreateError(notFound.code, notFound.status);
  }

  res.status(ok.code).json({
    ingList: ingList,
    status: ok.status,
  });
};

export default getIng;
