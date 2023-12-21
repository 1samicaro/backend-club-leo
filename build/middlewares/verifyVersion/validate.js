"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../validator"));
const validateVersion = [
    (0, express_validator_1.header)('Version', 'Version not valid')
        .optional()
        .isString()
        .isLength({ min: 5, max: 8 })
        .trim()
        .escape(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
exports.default = validateVersion;
