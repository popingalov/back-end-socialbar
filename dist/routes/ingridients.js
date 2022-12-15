"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getAll_1 = __importDefault(require("../controllers/ingridients/getAll"));
var newIng_1 = __importDefault(require("../controllers/ingridients/newIng"));
var roter = express_1.default.Router();
roter.get('/', getAll_1.default);
roter.post('/', newIng_1.default);
exports.default = roter;
//# sourceMappingURL=ingridients.js.map