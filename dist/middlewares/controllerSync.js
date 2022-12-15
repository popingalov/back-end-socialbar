"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_responses_1 = __importDefault(require("../libs/http-responses"));
console.log(http_responses_1.default);
// const controllerSync = ctrl => {
//   return async (req, res, next) => {
//     try {
//       await ctrl(req, res, next);
//     } catch (error) {
//       if (error.message.includes('validation failed')) {
//         error.status = badValid.code;
//       }
//       next(error);
//     }
//   };
// };
// export default controllerSync
//# sourceMappingURL=controllerSync.js.map