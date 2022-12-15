"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import getAll from '../controllers/coctails/getAll';
const newCoc_1 = __importDefault(require("../controllers/coctails/newCoc"));
const roter = express_1.default.Router();
// roter.get('/', getAll);
roter.post('/', newCoc_1.default);
exports.default = roter;
//# sourceMappingURL=coctailts.js.map