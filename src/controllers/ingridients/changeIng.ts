import code from '../../libs/http-responses';
const { created } = code;
import ingModel from '../../models/ingridient';
const { Ing } = ingModel;
import { IngList } from './ing';
import { Request, Response } from 'express';
const changeIng = async (req: Request, res: Response) => {
  const { date } = req.body;

  const { _id } = await Ing.findOneAndUpdate(date._id, date);

  const result: IngList = await Ing.findOne(
    _id,
    '-createdAt -owner -updatedAt',
  );

  res.status(created.code).json(result);
};

export default changeIng;
