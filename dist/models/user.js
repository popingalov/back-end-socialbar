"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('mongoose'), Schema = _a.Schema, model = _a.model;
var joi_1 = __importDefault(require("joi"));
var emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var userSchema = new Schema({
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
    // avatar: {
    //   type: URL,
    // },
    verify: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true, collection: 'users' });
var userJoiSchema = joi_1.default.object({
    email: joi_1.default.string().pattern(emailRegExp).required(),
    name: joi_1.default.string().min(2),
    verify: {
        type: Boolean,
        required: false,
    },
});
var User = model('user', userSchema);
var userVerificationJoiSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
});
exports.default = {
    User: User,
    userJoiSchema: userJoiSchema,
    userVerificationJoiSchema: userVerificationJoiSchema,
};
//# sourceMappingURL=user.js.map