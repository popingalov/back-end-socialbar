import code from '../../libs/http-responses';
const { created } = code;
import cocModel from '../../models/coctails';
const { Coc } = cocModel;
import { RootObject } from './coctails';

const takeAllCoc = async (req: any, res: any) => {
  const { email } = req.headers;

  const allCoc: RootObject[] = await Coc.find(
    { owner: email },
    '-createdAt -owner -updatedAt',
  ).populate([
    { path: 'ingredients.ing', select: '-createdAt -owner -updatedAt' },
    { path: 'ingredients.alternative', select: 'name _id' },
  ]);

  res.status(created.code).json(allCoc);
};

export default takeAllCoc;
