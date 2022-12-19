"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var addCocktail_1 = __importDefault(require("../controllers/cocktails/addCocktail"));
var getAll_1 = __importDefault(require("../controllers/cocktails/getAll"));
var roter = express_1.default.Router();
//
var controllerSync_1 = __importDefault(require("../middlewares/controllerSync"));
var coctails_1 = __importDefault(require("../models/coctails"));
var valid_1 = __importDefault(require("../middlewares/valid"));
var changeCocktail_1 = __importDefault(require("../controllers/cocktails/changeCocktail"));
//
roter.get('/', (0, controllerSync_1.default)(getAll_1.default));
roter.post('/', (0, valid_1.default)(coctails_1.default.addCocJoi), (0, controllerSync_1.default)(addCocktail_1.default));
roter.put('/', (0, valid_1.default)(coctails_1.default.changeCocJoi), (0, controllerSync_1.default)(changeCocktail_1.default));
exports.default = roter;
//# sourceMappingURL=cocktails.js.map