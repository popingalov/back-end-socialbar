"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose = require('mongoose');
const { DB_HOST, PORT = 4000 } = process.env;
//монго ругає((
mongoose.set('strictQuery', false);
mongoose
    .connect(DB_HOST)
    .then(() => app_1.default.listen(PORT, () => {
    console.log('Database try and we listen port 4000');
}))
    .catch((error) => {
    console.log('Error', error.message);
    process.exit(1);
});
//# sourceMappingURL=server.js.map