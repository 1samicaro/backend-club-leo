"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../../../../middlewares/validator"));
const validateCreateDocumentType = [
    (0, express_validator_1.body)('name', 'Name not valid')
        .exists()
        .isString()
        .isLength({ min: 3, max: 40 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('label', 'Label nor valid')
        .exists()
        .isString()
        .isLength({ min: 1, max: 3 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('countryId', 'Country not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('personTypeId', 'PersonType not valid')
        .exists()
        .isInt()
        .toInt(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const validateListDocumentTypes = [
    (0, express_validator_1.query)('countryId', 'Country not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.query)('personTypeId', 'PersonType not valid')
        .exists()
        .isInt()
        .toInt(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const documentTypesValidator = { validateCreateDocumentType, validateListDocumentTypes };
exports.default = documentTypesValidator;
