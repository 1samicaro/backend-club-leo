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
const cities_1 = __importDefault(require("../controllers/cities"));
const cities_2 = __importDefault(require("../utils/validator/cities"));
const router = (0, express_1.Router)();
router.get('/', cities_2.default.validateListCities, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield cities_1.default.listCities(req);
        res.status(200).json(cities);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting cities' });
    }
}));
router.post('/', cities_2.default.validateCreateCity, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCity = yield cities_1.default.createCities(req);
        res.status(201).json(newCity);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error creating city' });
    }
}));
exports.default = router;
