import ingModel from '../../models/ingridient';
const { Ing } = ingModel;
const CreateError = require('http-errors');

const { ok, notFound } = require('../../libs').HTTP_RESPONSES;

const getIng = async (req: any, res: any) => {
  const { email } = req.headers;

  const ingList = await Ing.find(
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
