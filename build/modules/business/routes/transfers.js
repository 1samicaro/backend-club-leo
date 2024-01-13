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
const passport_1 = __importDefault(require("passport"));
const transfers_1 = __importDefault(require("../controllers/transfers"));
const users_1 = __importDefault(require("../../auth/controllers/users"));
const router = (0, express_1.Router)();
router.put('/', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transfers_1.default.transfer(req);
        res.status(200).json({ message: 'Transfer complete' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error transferring points' });
    }
}));
router.put('/send', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transfers_1.default.sendPoints(req);
        res.status(200).json({ message: 'Send complete' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error sending points' });
    }
}));
router.get('/transactions', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transfers_1.default.listTransactions(req);
        res.status(200).json(transactions);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting transactions' });
    }
}));
router.get('/transactions/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield transfers_1.default.listTransactionsByUser(req);
        res.status(200).json(transaction);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting transactions' });
    }
}));
router.get('/verify/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.getUserByUserName(req);
        res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting user' });
    }
}));
exports.default = router;
