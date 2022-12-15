import code from '../../libs/http-responses';
const { created } = code;
import cocModel from '../../models/coctails';
const { Coc } = cocModel;
// import ingModel from '../../models/ingridient';
// const { Ing } = ingModel;

const createTransaction = async (req: any, res: any) => {
  const { date, email } = req.body;

  //   const ingList = await Ing.find(
  //     { owner: email, id: date.ingredients },
  //     '-owner -createdAt -updatedAt',
  //   );

  const allCoc = await Coc.find(
    { owner: email },
    '-createdAt -owner -updatedAt',
  );
  date.owner = email;

  const newIng = await Coc.create(date);

  allCoc.push(newIng);

  res.status(created.code).json(allCoc);
};

export default createTransaction;
