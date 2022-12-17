import code from '../../libs/http-responses';
const { created } = code;
import ingModel from '../../models/ingridient';
const { Ing } = ingModel;

const createIng = async (req: any, res: any) => {
  const { date } = req.body;
  const { email } = req.headers;

  date.owner = email;

  const { _id } = await Ing.create(date);
  const allIng = await Ing.findOne(_id, '-createdAt -owner -updatedAt');

  res.status(created.code).json(allIng);
};

export default createIng;
