import code from '../../libs/http-responses';
const { created } = code;
import cocModel from '../../models/coctails';
const { Coc } = cocModel;
import { RootObject } from './cocktails';
import { Request, Response } from 'express';
const changeCoc = async (req: Request, res: Response) => {
  const { date } = req.body;

  const { _id }: RootObject = await Coc.findOneAndUpdate(date._id, date);
  const result: RootObject = await Coc.findOne(
    _id,
    '-createdAt -owner -updatedAt',
  ).populate([
    { path: 'ingredients.ing', select: '-createdAt -owner -updatedAt' },
    { path: 'ingredients.alternative', select: 'name _id' },
  ]);

  res.status(created.code).json(result);
};

export default changeCoc;
