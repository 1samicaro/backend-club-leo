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
        .toDate(),
    (0, express_validator_1.body)('DocumentTypeId', 'DocumentTypeId not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('RoleId', 'RoleId not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('CountryId', 'CountryId not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('PersonTypeId', 'PersonTypeId not valid')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('username', 'Username not valid')
        .exists()
        .isString()
        .isLength({ min: 3, max: 15 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('discount', 'Discount not valid')
        .optional(),
    (0, express_validator_1.body)('Partner', 'Partner not valid')
        .optional()
        .isString()
        .isLength({ max: 15 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('AdditionalTypeId', 'AdditionalTypeId not valid')
        .optional()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('Categories', 'Categories not valid')
        .optional()
        .isArray(),
    (0, express_validator_1.body)('representName', 'RepresentativeName not valid')
        .optional()
        .isArray({ min: 1, max: 4 }),
    (0, express_validator_1.body)('representDocumentNumber', 'RepresentativeDocumentNumber not valid')
        .optional()
        .isString()
        .isInt()
        .isLength({ min: 3, max: 15 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('representEmail', 'RepresentativeEmail not valid')
        .optional()
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.body)('representPhone', 'RepresentativePhone not valid')
        .optional()
        .isString()
        .isInt()
        .isLength({ min: 6, max: 15 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('docs', 'docs not valid')
        .optional()
        .isArray(),
    (0, express_validator_1.body)('address', 'Address not valid')
        .optional()
        .isString()
        .isLength({ min: 3, max: 100 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('website', 'Website not valid')
        .optional()
        .isString()
        .isLength({ min: 3, max: 100 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('description', 'Description not valid')
        .optional()
        .isString()
        .isLength({ min: 3 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('profilePic', 'ProfilePic not valid')
        .optional()
        .isString()
        .trim(),
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
const validateSearchUsers = [
    (0, express_validator_1.body)('CountryId', 'CountryId not valid')
        .optional()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('CityId', 'CityId not valid')
        .optional()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('PersonTypeId', 'PersonTypeId not valid')
        .optional()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('AdditionalTypeId', 'AdditionalTypeId not valid')
        .optional()
        .isInt()
        .toInt(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const validateUpdateUsers = [
    (0, express_validator_1.body)('phone', 'Phone not valid')
        .optional()
        .isString()
        .isInt()
        .isLength({ min: 6, max: 15 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('password', 'Password not valid')
        .optional()
        .isString()
        .isStrongPassword()
        .trim()
        .escape(),
    (0, express_validator_1.body)('Categories', 'Categories not valid')
        .optional()
        .isArray(),
    (0, express_validator_1.body)('representName', 'RepresentativeName not valid')
        .optional()
        .isArray({ min: 1, max: 4 }),
    (0, express_validator_1.body)('representDocumentNumber', 'RepresentativeDocumentNumber not valid')
        .optional()
        .isString()
        .isInt()
        .isLength({ min: 3, max: 15 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('representEmail', 'RepresentativeEmail not valid')
        .optional()
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.body)('representPhone', 'RepresentativePhone not valid')
        .optional()
        .isString()
        .isInt()
        .isLength({ min: 6, max: 15 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('docs', 'docs not valid')
        .optional()
        .isArray(),
    (0, express_validator_1.body)('address', 'Address not valid')
        .optional()
        .isString()
        .isLength({ min: 3, max: 100 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('website', 'Website not valid')
        .optional()
        .isString()
        .isLength({ min: 3, max: 100 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('discount', 'Discount not valid')
        .optional(),
    (0, express_validator_1.body)('RoleId', 'RoleId not valid')
        .optional()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('CountryId', 'CountryId not valid')
        .optional()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('CityId', 'CityId not valid')
        .optional()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('description', 'Description not valid')
        .optional()
        .isString()
        .isLength({ min: 3 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('profilePic', 'ProfilePic not valid')
        .optional()
        .isString()
        .trim(),
    (req, res, next) => {
        (0, validator_1.default)(req, res, next);
    }
];
const usersValidator = { validateCreateUsers, validateUserInfo, validateSearchUsers, validateUpdateUsers };
exports.default = usersValidator;
