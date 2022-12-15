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
const ingridient_1 = __importDefault(require("../../models/ingridient"));
const { Ing } = ingridient_1.default;
const CreateError = require('http-errors');
const { ok, notFound } = require('../../libs').HTTP_RESPONSES;
const getIng = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const ingList = yield Ing.find({ owner: email }, '-owner -createdAt -updatedAt');
    console.log(ingList);
    if (!ingList) {
        throw new CreateError(notFound.code, notFound.status);
    }
    res.status(ok.code).json({
        ingList: ingList,
        status: ok.status,
    });
});
exports.default = getIng;
//# sourceMappingURL=getAll.js.map