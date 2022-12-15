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
const http_responses_1 = __importDefault(require("../../libs/http-responses"));
const { created } = http_responses_1.default;
const coctails_1 = __importDefault(require("../../models/coctails"));
const { Coc } = coctails_1.default;
// import ingModel from '../../models/ingridient';
// const { Ing } = ingModel;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, email } = req.body;
    //   const ingList = await Ing.find(
    //     { owner: email, id: date.ingredients },
    //     '-owner -createdAt -updatedAt',
    //   );
    const allCoc = yield Coc.find({ owner: email }, '-createdAt -owner -updatedAt');
    date.owner = email;
    const newIng = yield Coc.create(date);
    allCoc.push(newIng);
    res.status(created.code).json(allCoc);
});
exports.default = createTransaction;
//# sourceMappingURL=newCoc.js.map