"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('mongoose'), Schema = _a.Schema, model = _a.model;
var joi_1 = __importDefault(require("joi"));
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
var addIngJoi = joi_1.default.object({
    date: joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        image: joi_1.default.string(),
        available: joi_1.default.boolean(),
        shop: joi_1.default.boolean(),
    }),
});
var changeIngJoi = joi_1.default.object({
    date: joi_1.default.object({
        _id: joi_1.default.string(),
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        image: joi_1.default.string(),
        available: joi_1.default.boolean(),
        shop: joi_1.default.boolean(),
    }),
});
var Ing = model('ingredient', ingShame);
exports.default = {
    Ing: Ing,
    changeIngJoi: changeIngJoi,
    addIngJoi: addIngJoi,
};
//# sourceMappingURL=ingridient.js.map