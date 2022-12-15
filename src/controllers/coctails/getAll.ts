import code from '../../libs/http-responses';
const { created } = code;
import cocModel from '../../models/coctails';
const { Coc } = cocModel;

const createTransaction = async (req: any, res: any) => {
  const { date, email } = req.body;

  const allCoc = await Coc.find(
    { owner: email },
    '-createdAt -owner -updatedAt',
  ).populate('ingredients');
  date.owner = email;

  res.status(created.code).json(allCoc);
};

export default createTransaction;
