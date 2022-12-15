"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getAll_1 = __importDefault(require("../controllers/ingridients/getAll"));
var newIng_1 = __importDefault(require("../controllers/ingridients/newIng"));
var roter = express_1.default.Router();
var controllerSync_1 = __importDefault(require("../middlewares/controllerSync"));
roter.get('/', (0, controllerSync_1.default)(getAll_1.default));
roter.post('/', (0, controllerSync_1.default)(newIng_1.default));
exports.default = roter;
//# sourceMappingURL=ingridients.js.map