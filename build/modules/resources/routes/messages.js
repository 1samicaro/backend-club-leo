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
const messages_1 = __importDefault(require("../controllers/messages"));
const messages_2 = __importDefault(require("../utils/validator/messages"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield messages_1.default.listMessages(req);
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(400).json({ message: 'Error getting messages' });
    }
}));
router.post('/', messages_2.default.validateCreateMessage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMessage = yield messages_1.default.createMessage(req);
        res.status(201).json(newMessage);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating message' });
    }
}));
exports.default = router;
