"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("../../../middlewares/logger"));
const countries_1 = __importDefault(require("../controllers/countries"));
const countries_2 = __importDefault(require("../utils/validator/countries"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield countries_1.default.listCountries();
        res.status(200).json(countries);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting countries' });
    }
}));
router.post('/', countries_2.default.validateCreateCountry, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCountry = yield countries_1.default.createCountries(req);
        res.status(201).json(newCountry);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error creating country' });
    }
}));
exports.default = router;
