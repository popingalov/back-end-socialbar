import code from '../../libs/http-responses';
const { created } = code;
import cocModel from '../../models/coctails';
const { Coc } = cocModel;
import { RootObject } from './coctails';
const createTransaction = async (req: any, res: any) => {
  const { date, email } = req.body;

  const allCoc: RootObject[] = await Coc.find(
    { owner: email },
    '-createdAt -owner -updatedAt',
  ).populate('ingredients', '-createdAt -owner -updatedAt');

  allCoc.forEach(obj => {
    obj.ingredients = obj.ingredients.map(el => {
      el.size = obj.size[el.name.toLowerCase()];
      console.log(el.size);
      return el;
    }, []);
  });

  date.owner = email;
  res.status(created.code).json(allCoc);
};

export default createTransaction;
