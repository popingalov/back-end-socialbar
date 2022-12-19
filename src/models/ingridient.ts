const { Schema, model } = require('mongoose');
import Joi, { types } from 'joi';
const ingShame = Schema(
  {
    name: { type: String, require: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: {
      type: String,
      default:
        'https://thumbs.dreamstime.com/b/coca-cola-drink-glass-ice-cubes-isolated-white-background-57156819.jpg',
    },
    available: {
      type: Boolean,
      default: false,
    },
    shop: {
      type: Boolean,
      default: false,
    },

    owner: { type: String, ref: 'user', required: true },
  },
  { versionKey: false, timestamps: true, collection: 'ingredient' },
);

const addIngJoi = Joi.object({
  date: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string(),
    available: Joi.boolean(),
    shop: Joi.boolean(),
  }),
});

const changeIngJoi = Joi.object({
  date: Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string(),
    available: Joi.boolean(),
    shop: Joi.boolean(),
  }),
});

const Ing = model('ingredient', ingShame);

export default {
  Ing,
  changeIngJoi,
  addIngJoi,
};
