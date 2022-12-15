"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const minitest = require('../controllers/index');
var newUser_1 = __importDefault(require("../controllers/users/newUser"));
var roter = express_1.default.Router();
var controllerSync_1 = __importDefault(require("middlewares/controllerSync"));
roter.post('/', (0, controllerSync_1.default)(newUser_1.default));
exports.default = roter;
//# sourceMappingURL=users.js.map