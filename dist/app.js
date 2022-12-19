"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
//
var ingredients_1 = __importDefault(require("./routes/ingredients"));
var users_1 = __importDefault(require("./routes/users"));
var cocktails_1 = __importDefault(require("./routes/cocktails"));
//
dotenv_1.default.config();
var app = (0, express_1.default)();
var formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
//
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/api/users', users_1.default);
app.use('/api/ing', ingredients_1.default);
app.use('/api/coc', cocktails_1.default);
exports.default = app;
// module.exports = app;
//# sourceMappingURL=app.js.map