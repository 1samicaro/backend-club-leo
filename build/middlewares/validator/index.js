"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const logger_1 = __importDefault(require("../../middlewares/logger"));
const validator = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        next();
    }
    catch (err) {
        logger_1.default.warn('Validation error ' + JSON.stringify(err.array()));
        res.status(422);
        res.json(err.array());
    }
};
exports.default = validator;
