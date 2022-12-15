"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAll_1 = __importDefault(require("../controllers/ingridients/getAll"));
const newIng_1 = __importDefault(require("../controllers/ingridients/newIng"));
const roter = express_1.default.Router();
roter.get('/', getAll_1.default);
roter.post('/', newIng_1.default);
exports.default = roter;
//# sourceMappingURL=ingridients.js.map