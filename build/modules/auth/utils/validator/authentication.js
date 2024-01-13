"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../../../../middlewares/validator"));
const validateAuthentication = [
    (0, express_validator_1.body)('username', 'Username not valid')
        .exists()
        .isLength({ min: 3, max: 20 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('password', 'Password not valid')
        .exists()
        .isString()
        .isLength({ min: 3, max: 40 })
        .trim()
        .escape(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const authenticationValidator = { validateAuthentication };
exports.default = authenticationValidator;
