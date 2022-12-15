const { Schema, model } = require('mongoose');
const Joi = require('joi');

const cocShame = Schema(
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
    id: { type: String, required: true },
    cocType: { type: Array, required: true },
    size: { type: Object, required: true },
    cocMetod: { type: String, default: 'Залити все в одну тару' },
    ingredients: [
      { type: Schema.Types.ObjectId, required: true, ref: 'ingredient' },
    ],
    glass: {
      type: String,
      default:
        'https://thumbs.dreamstime.com/b/coca-cola-drink-glass-ice-cubes-isolated-white-background-57156819.jpg',
    },
    owner: { type: String, ref: 'user', required: true },
  },
  { versionKey: false, timestamps: true, collection: 'cocktails' },
);

const addcoc = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.string(),
  alternative: Joi.array(),
  available: Joi.boolean(),
  id: Joi.string().required(),
  cocType: Joi.string().required(),
  size: Joi.array().required(),
  cocMetod: Joi.string(),
  ingredients: Joi.array().required(),
});

const Coc = model('cocktails', cocShame);

export default {
  Coc,
  ingJoiSchemas: {
    addcoc,
  },
};
