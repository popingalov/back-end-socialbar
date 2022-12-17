"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('mongoose'), Schema = _a.Schema, model = _a.model;
var Joi = require('joi');
var ingShame = Schema({
    name: { type: String, require: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: {
        type: String,
        default: 'https://thumbs.dreamstime.com/b/coca-cola-drink-glass-ice-cubes-isolated-white-background-57156819.jpg',
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
}, { versionKey: false, timestamps: true, collection: 'ingredient' });
var addIngJoi = Joi.object({
    date: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        image: Joi.string(),
        available: Joi.boolean(),
        shop: Joi.boolean(),
    }),
});
var changeIngJoi = Joi.object({
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
var Ing = model('ingredient', ingShame);
exports.default = {
    Ing: Ing,
    changeIngJoi: changeIngJoi,
    addIngJoi: addIngJoi,
};
//# sourceMappingURL=ingridient.js.map