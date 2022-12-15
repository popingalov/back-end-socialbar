// const bcrypt = require('bcryptjs');
const CreateError = require('http-errors');
// const { v4 } = require('uuid');

// const { User, Category } = require('../../models');
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
  console.log(email);

  const user = await User.findOne({ email: trimedEmail });

  if (user) {
    throw new CreateError(inUse.code, inUse.status);
  }

  //   const salt = await bcrypt.genSalt(saltDifficult);
  //   const hashPass = await bcrypt.hash(password, salt);
  //   const verificationToken = v4();
  await User.create({
    email: trimedEmail,
    name,
    // password: hashPass,
    // verificationToken,
  });

  // await Category.create({ owner: newUser.email });

  res.status(created.code).json({
    user: {
      email,
      status: created.status,
    },
  });
};

export default authHandler;
