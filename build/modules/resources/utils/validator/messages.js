"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../../../../middlewares/validator"));
const validateCreateMessage = [
    (0, express_validator_1.body)('query', 'Query not valid')
        .exists()
        .isString()
        .trim()
        .escape(),
    (0, express_validator_1.body)('message', 'Message not valid')
        .exists()
        .isArray()
        .trim()
        .escape(),
    (0, express_validator_1.body)('user', 'User not valid')
        .exists()
        .isString()
        .trim()
        .escape(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const messagesValidator = { validateCreateMessage };
exports.default = messagesValidator;
