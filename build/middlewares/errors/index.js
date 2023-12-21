"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalErrorHandler = exports.error404 = void 0;
const logger_1 = __importDefault(require("../../middlewares/logger"));
const error404 = (req, res) => {
    const url = req.originalUrl;
    logger_1.default.error("Route didn't exist " + url);
    res.status(404).json({ message: 'Route not found' });
};
exports.error404 = error404;
const generalErrorHandler = (err, _req, res) => {
    var _a;
    const status = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
    const message = err;
    logger_1.default.error('General error ' + JSON.stringify(message));
    res.status(status).json(message);
};
exports.generalErrorHandler = generalErrorHandler;
