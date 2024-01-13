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
const authentication_1 = __importDefault(require("../utils/validator/authentication"));
const authentication_2 = __importDefault(require("../controllers/authentication"));
// import { bruteLimiter } from '../utils/bruteForceLimiter'
const router = (0, express_1.Router)();
router.post('/login', authentication_1.default.validateAuthentication, passport_1.default.authenticate('local', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = req.user;
        if ((response === null || response === void 0 ? void 0 : response.isError) === true) {
            res.status(401).json(response === null || response === void 0 ? void 0 : response.message);
            return;
        }
        res.status(200).json(response);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error Authenticating' });
    }
}));
router.post('/refresh', passport_1.default.authenticate('refresh', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = req.user;
        if ((response === null || response === void 0 ? void 0 : response.isError) === true) {
            res.status(401).json(response === null || response === void 0 ? void 0 : response.message);
            return;
        }
        res.status(200).json(response);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error Refreshing' });
    }
}));
router.post('/logout', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authentication_2.default.logoutUser(req);
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error Logging out' });
    }
}));
exports.default = router;
