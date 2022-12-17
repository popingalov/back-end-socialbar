const { Schema, model } = require('mongoose');
const Joi = require('joi');

const cocShame = Schema(
  {
    name: { type: String, require: true },
    description: { type: String, required: true },
    image: {
      type: String,
      default:
        'https://thumbs.dreamstime.com/b/coca-cola-drink-glass-ice-cubes-isolated-white-background-57156819.jpg',
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    isMine: {
      type: Boolean,
      default: false,
    },
    cocType: [{ type: String, required: true }],
    cocMetod: { type: String, default: 'Залити все в одну тару' },
    ingredients: [
      {
        ing: { type: Schema.Types.ObjectId, required: true, ref: 'ingredient' },

        size: { type: String, required: true },
        alternative: [
          { type: Schema.Types.ObjectId, ref: 'ingredient', default: null },
        ],
        optional: { type: Boolean, default: false },
        dressing: { type: Boolean, default: false },
        sizeType: { type: String, default: 'ml' },
      },
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

const addCocJoi = Joi.object({
  date: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    favorite: Joi.boolean(),
    isMine: Joi.boolean(),
    cocType: Joi.array().items(Joi.string()),
    cocMethod: Joi.string(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          ing: Joi.string().required(),
          size: Joi.string().required(),
          alternative: Joi.array().items(Joi.string()),
          optional: Joi.boolean(),
          dressing: Joi.boolean(),
          sizeType: Joi.string(),
        }),
      )
      .required(),
    glass: Joi.string(),
  }),
});
const changeCocJoi = Joi.object({
  date: Joi.object({
    _id: Joi.string(),
name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    favorite: Joi.boolean(),
    isMine: Joi.boolean(),
    cocType: Joi.array().items(Joi.string()),
    cocMethod: Joi.string(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          ing: Joi.string().required(),
          size: Joi.string().required(),
          alternative: Joi.array().items(Joi.string()),
          optional: Joi.boolean(),
          dressing: Joi.boolean(),
          sizeType: Joi.string(),
        }),
      )
      .required(),
    glass: Joi.string(),
  }),
});



const Coc = model('cocktails', cocShame);

export default {
  Coc,
  addCocJoi,
  changeCocJoi,
};
