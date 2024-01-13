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
const personTypes_1 = __importDefault(require("../controllers/personTypes"));
const personTypes_2 = __importDefault(require("../utils/validator/personTypes"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personTypes = yield personTypes_1.default.listPersonTypes();
        res.status(200).json(personTypes);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting person types' });
    }
}));
router.post('/', personTypes_2.default.validateCreatePersonType, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPersonType = yield personTypes_1.default.createPersonType(req);
        res.status(201).json(newPersonType);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error creating person type' });
    }
}));
exports.default = router;
