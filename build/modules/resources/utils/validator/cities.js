"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../../../../middlewares/validator"));
const validateCreateCity = [
    (0, express_validator_1.body)('name', 'Name not valid')
        .exists()
        .isString()
        .isLength({ min: 3, max: 40 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('countryId', 'Country not valid')
        .exists()
        .isInt()
        .toInt(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const validateListCities = [
    (0, express_validator_1.query)('countryId', 'Country not valid')
        .exists()
        .isInt()
        .toInt(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const citiesValidator = { validateCreateCity, validateListCities };
exports.default = citiesValidator;
