import code from '../../libs/http-responses';
const { created } = code;
import ingModel from '../../models/ingridient';
const { Ing } = ingModel;

const createTransaction = async (req: any, res: any) => {
  const { date } = req.body;
  const { email } = req.headers;

  let allIng = await Ing.find({ owner: email }, '-createdAt -owner -updatedAt');
  date.owner = email;

  const newIng = await Ing.create(date);

  allIng.push(newIng);

  res.status(created.code).json(allIng);
};

export default createTransaction;
