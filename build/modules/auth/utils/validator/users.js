"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../../../../middlewares/validator"));
const validateCreateUsers = [
    (0, express_validator_1.body)('name', 'Name not valid')
        .exists()
        .isArray({ min: 1, max: 4 }),
    (0, express_validator_1.body)('documentNumber', 'DocumentNumber not valid')
        .exists()
        .isString()
        .isInt()
        .isLength({ min: 3, max: 15 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('email', 'Email not valid')
        .exists()
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.body)('phone', 'Phone not valid')
        .exists()
        .isString()
        .isInt()
        .isLength({ min: 6, max: 15 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('password', 'Password not valid')
        .exists()
        .isString()
        .isStrongPassword()
        .trim()
        .escape(),
    (0, express_validator_1.body)('birthDate', 'BirthDate not valid')
        .exists()
        .isString()
        .isDate()
        .toDate(),
    (0, express_validator_1.body)('documentTypeId', 'DocumentTypeId not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('roleId', 'RoleId not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('countryId', 'CountryId not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('cityId', 'CityId not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('personTypeId', 'PersonTypeId not valid')
        .exists()
        .isInt()
        .toInt(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const validateUserInfo = [
    (0, express_validator_1.param)('id', 'Id not valid')
        .exists()
        .isString(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const usersValidator = { validateCreateUsers, validateUserInfo };
exports.default = usersValidator;
