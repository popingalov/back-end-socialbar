"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const bcrypt = require('bcryptjs');
const CreateError = require('http-errors');
// const { v4 } = require('uuid');
// const { User, Category } = require('../../models');
const user_1 = __importDefault(require("../../models/user"));
const { User } = user_1.default;
const { 
// saltDifficult,
HTTP_RESPONSES: { inUse, created }, } = require('../../libs');
const authHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    const trimedEmail = email.trim();
    console.log(email);
    const user = yield User.findOne({ email: trimedEmail });
    if (user) {
        throw new CreateError(inUse.code, inUse.status);
    }
    //   const salt = await bcrypt.genSalt(saltDifficult);
    //   const hashPass = await bcrypt.hash(password, salt);
    //   const verificationToken = v4();
    yield User.create({
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
});
exports.default = authHandler;
//# sourceMappingURL=newUser.js.map