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
const loans_1 = __importDefault(require("../controllers/loans"));
// import { authorizeUser } from '../../auth/controllers/roles'
const router = (0, express_1.Router)();
router.get('/maxLoan', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('loans');
        const loan = yield loans_1.default.getMaxLoanByUser(req);
        console.log(loan);
        res.status(200).json(loan);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json(error);
    }
}));
router.get('/', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield loans_1.default.getLoansByUser(req);
        res.status(200).json(loans);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json(error);
    }
}));
router.post('/', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLoan = yield loans_1.default.postLoan(req);
        res.status(201).json(newLoan);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json(error);
    }
}));
router.patch('/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loan = yield loans_1.default.approveLoan(req);
        res.status(200).json(loan);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json(error);
    }
}));
router.patch('/payLoan/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loan = yield loans_1.default.payLoan(req);
        res.status(200).json(loan);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json(error);
    }
}));
exports.default = router;
