"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getAll_1 = __importDefault(require("../controllers/ingridients/getAll"));
var newIngredient_1 = __importDefault(require("../controllers/ingridients/newIngredient"));
var changeIngredient_1 = __importDefault(require("../controllers/ingridients/changeIngredient"));
var roter = express_1.default.Router();
var controllerSync_1 = __importDefault(require("../middlewares/controllerSync"));
var valid_1 = __importDefault(require("../middlewares/valid"));
var ingridient_1 = __importDefault(require("../models/ingridient"));
//
roter.get('/', (0, controllerSync_1.default)(getAll_1.default));
roter.post('/', (0, valid_1.default)(ingridient_1.default.addIngJoi), (0, controllerSync_1.default)(newIngredient_1.default));
roter.put('/', (0, valid_1.default)(ingridient_1.default.changeIngJoi), (0, controllerSync_1.default)(changeIngredient_1.default));
exports.default = roter;
//# sourceMappingURL=ingredients.js.map