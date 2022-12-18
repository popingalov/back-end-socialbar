const CreateError = require('http-errors');

import model from '../../models/user';
const { User } = model;
const {
  // saltDifficult,
  HTTP_RESPONSES: { inUse, created },
} = require('../../libs');

import { Request, Response } from 'express';
const authHandler = async (req: Request, res: Response) => {
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
