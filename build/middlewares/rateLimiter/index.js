"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = __importDefault(require("../logger"));
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        var _a;
        const ip = (_a = req.headers['x-forwarded-for']) !== null && _a !== void 0 ? _a : req.socket.remoteAddress;
        logger_1.default.error('Too Much Attempts from ' + ip);
        res.status(429).json({ message: 'Too Much Attempts' });
    }
});
