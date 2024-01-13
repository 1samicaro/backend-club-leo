"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (user, secret) => {
    const token = jsonwebtoken_1.default.sign({ id: user.id, RoleId: user.RoleId }, secret, { expiresIn: '1h' });
    return token;
};
exports.signToken = signToken;
const signRefreshToken = (user, uuid, secret) => {
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id, lastToken: uuid }, secret, { expiresIn: '7d' });
    return refreshToken;
};
exports.signRefreshToken = signRefreshToken;
