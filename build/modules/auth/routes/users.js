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
const users_1 = __importDefault(require("../controllers/users"));
const users_2 = __importDefault(require("../utils/validator/users"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.listUsers();
        res.status(200).json(users);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting users' });
    }
}));
router.post('/', users_2.default.validateCreateUsers, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield users_1.default.createUsers(req);
        res.status(201).json(newUser);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error creating user' });
    }
}));
router.get('/:id', users_2.default.validateUserInfo, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.userInfo(req);
        res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting user' });
    }
}));
exports.default = router;
