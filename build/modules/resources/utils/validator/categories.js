"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../../../../middlewares/validator"));
const validateCreateCategory = [
    (0, express_validator_1.body)('name', 'Name not valid')
        .exists()
        .isString()
        .isLength({ min: 3, max: 40 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('image', 'Image not valid')
        .exists()
        .isString(),
    (0, express_validator_1.body)('isService', 'isService not valid')
        .exists()
        .isBoolean(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const categoriesValidator = { validateCreateCategory };
exports.default = categoriesValidator;
