const { Schema, model } = require('mongoose');
import Joi from 'joi';

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [emailRegExp, 'Please fill a valid email address'],
      unique: true,
    },
    name: {
      type: String,
      minlength: 2,
    },
    avatar: {
      type: URL,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true, collection: 'users' },
);

const userJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  name: Joi.string().min(2),
  token: {
    type: String,
    required: false,
  },
});

const User = model('user', userSchema);

const userVerificationJoiSchema = Joi.object({
  email: Joi.string().required(),
});

export default {
  User,
  userJoiSchema,
  userVerificationJoiSchema,
};
