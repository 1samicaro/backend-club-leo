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
const genders_1 = __importDefault(require("../controllers/genders"));
const genders_2 = __importDefault(require("../utils/validator/genders"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genders = yield genders_1.default.listGenders();
        res.status(200).json(genders);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting genders' });
    }
}));
router.post('/', genders_2.default.validateCreateGenders, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGender = yield genders_1.default.createGenders(req);
        res.status(201).json(newGender);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error creating gender' });
    }
}));
exports.default = router;
