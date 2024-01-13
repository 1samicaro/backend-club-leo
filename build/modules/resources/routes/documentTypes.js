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
const documentTypes_1 = __importDefault(require("../controllers/documentTypes"));
const documentTypes_2 = __importDefault(require("../utils/validator/documentTypes"));
const router = (0, express_1.Router)();
router.get('/', documentTypes_2.default.validateListDocumentTypes, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentTypes = yield documentTypes_1.default.listDocumentTypes(req);
        res.status(200).json(documentTypes);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting document types' });
    }
}));
router.post('/', documentTypes_2.default.validateCreateDocumentType, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDocumentType = yield documentTypes_1.default.createDocumentType(req);
        res.status(201).json(newDocumentType);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error creating document type' });
    }
}));
exports.default = router;
