"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('mongoose'), Schema = _a.Schema, model = _a.model;
var Joi = require('joi');
var cocShame = Schema({
    name: { type: String, require: true },
    description: { type: String, required: true },
    image: {
        type: String,
        default: 'https://thumbs.dreamstime.com/b/coca-cola-drink-glass-ice-cubes-isolated-white-background-57156819.jpg',
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
        default: 'https://thumbs.dreamstime.com/b/coca-cola-drink-glass-ice-cubes-isolated-white-background-57156819.jpg',
    },
    owner: { type: String, ref: 'user', required: true },
}, { versionKey: false, timestamps: true, collection: 'cocktails' });
var addcoc = Joi.object({
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
var Coc = model('cocktails', cocShame);
exports.default = {
    Coc: Coc,
    ingJoiSchemas: {
        addcoc: addcoc,
    },
};
//# sourceMappingURL=coctails.js.map