const CreateError = require('http-errors');

import model from '../../models/user';
const { User } = model;
const {
  // saltDifficult,
  HTTP_RESPONSES: { inUse, created },
} = require('../../libs');

interface Ireq {
  body: {
    email: string;
    name: string;
  };
}

const authHandler = async (req: Ireq, res: any) => {
  const { email, name } = req.body;
  const trimedEmail = email.trim();

  const user = await User.findOne({ email: trimedEmail });

  if (user) {
    throw new CreateError(inUse.code, inUse.status);
  }

  await User.create({
    email: trimedEmail,
    name,
  });

  res.status(created.code).json({
    user: {
      email,
      status: created.status,
    },
  });
};

export default authHandler;
