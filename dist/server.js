"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var mongoose = require('mongoose');
var _a = process.env, DB_HOST = _a.DB_HOST, _b = _a.PORT, PORT = _b === void 0 ? 4000 : _b;
//монго ругає((
mongoose.set('strictQuery', false);
mongoose
    .connect(DB_HOST)
    .then(function () {
    return app_1.default.listen(PORT, function () {
        console.log('Database try and we listen port 4000');
    });
})
    .catch(function (error) {
    console.log('Error', error.message);
    process.exit(1);
});
//# sourceMappingURL=server.js.map