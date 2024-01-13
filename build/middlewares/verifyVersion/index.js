"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyVersion = void 0;
const logger_1 = __importDefault(require("../../middlewares/logger"));
const verifyVersion = (req, res, next) => {
    const { VERSION } = process.env;
    const version = req.header('Version');
    if (version !== VERSION) {
        logger_1.default.warn('Wrong app version ' + version);
        res.status(426).json({ message: 'Wrong app version' });
    }
    else
        next();
};
exports.verifyVersion = verifyVersion;
