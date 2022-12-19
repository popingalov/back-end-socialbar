import code from '../../libs/http-responses';
const { created } = code;
import cocModel from '../../models/coctails';
import { RootObject } from './cocktails';
const { Coc } = cocModel;
import { Request, Response } from 'express';

interface IReq extends Request {
  headers: {
    email: string;
  };
}
const createCoc = async (req: IReq, res: Response) => {
  const { date } = req.body;
  const { email } = req.headers;
  date.owner = email;
  const { _id } = await Coc.create(date);

  const allCoc: RootObject[] = await Coc.findOne(
    _id,
    '-createdAt -owner -updatedAt',
  ).populate([
    { path: 'ingredients.ing', select: '-createdAt -owner -updatedAt' },
    { path: 'ingredients.alternative', select: 'name _id' },
  ]);

  res.status(created.code).json(allCoc);
};

export default createCoc;
