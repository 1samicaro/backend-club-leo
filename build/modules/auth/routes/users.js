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
const passport_1 = __importDefault(require("passport"));
const logger_1 = __importDefault(require("../../../middlewares/logger"));
const users_1 = __importDefault(require("../controllers/users"));
const users_2 = __importDefault(require("../utils/validator/users"));
const roles_1 = require("../controllers/roles");
const mercadopago_1 = __importDefault(require("mercadopago"));
const router = (0, express_1.Router)();
router.get('/', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthorized = yield (0, roles_1.authorizeUser)(req, 'read:users');
        if (!isAuthorized) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const users = yield users_1.default.listUsers();
        res.status(200).json(users);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting users' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.error('req.body', req.body);
        const newUser = yield users_1.default.createUsers(req);
        res.status(201).json(newUser);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error creating user' });
    }
}));
router.patch('/', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.default.updateUserById(req);
        res.status(200).json({ message: 'User updated' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error updating user' });
    }
}));
router.get('/descendants', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const descendants = yield users_1.default.listDescendants(req);
        res.status(200).json(descendants);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting descendants' });
    }
}));
router.patch('/verify/:id', passport_1.default.authenticate('jwt', { session: false }), users_2.default.validateUserInfo, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthorized = yield (0, roles_1.authorizeUser)(req, 'update:users');
        if (!isAuthorized) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        yield users_1.default.verifyUserById(req);
        res.status(200).json({ message: 'User verified' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error verifying user' });
    }
}));
router.delete('/', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.default.deleteUserById(req);
        res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error deleting user' });
    }
}));
router.patch('/ban/:id', passport_1.default.authenticate('jwt', { session: false }), users_2.default.validateUserInfo, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthorized = yield (0, roles_1.authorizeUser)(req, 'update:users');
        if (!isAuthorized) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        yield users_1.default.banUserById(req);
        res.status(200).json({ message: 'User banned' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error banning user' });
    }
}));
router.get('/:id', passport_1.default.authenticate('jwt', { session: false }), users_2.default.validateUserInfo, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.userInfo(req);
        res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting user' });
    }
}));
router.post('/search', passport_1.default.authenticate('jwt', { session: false }), users_2.default.validateSearchUsers, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthorized = yield (0, roles_1.authorizeUser)(req, 'read:users');
        if (!isAuthorized) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const users = yield users_1.default.searchUsers(req);
        res.status(200).json(users);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting users' });
    }
}));
router.get('/reset/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.default.resetPassword(req);
        res.status(200).json({ message: 'mail send' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error sending mail' });
    }
}));
router.get('/resetVerify/:username/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.default.resetPasswordVerify(req);
        res.status(200).json({ message: 'Password reset' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error resetting password' });
    }
}));
router.post('/paySuscription', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preference = {
            items: [
                {
                    title: 'Suscripcion',
                    unit_price: 50000,
                    quantity: 1
                }
            ],
            back_urls: {
                success: 'www.clubleo.net/sendpay',
                failure: 'www.clubleo.net',
                pending: 'www.clubleo.net'
            },
            auto_return: 'approved'
        };
        mercadopago_1.default.configure({
            access_token: 'APP_USR-6830219983343019-022211-5ce7634ea505c52049bb7f5b515ef0dc-1680049721'
        });
        const response = yield mercadopago_1.default.preferences.create(preference);
        res.status(200).json(response);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error sending mail' });
    }
}));
router.patch('/sendPay', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.default.updatePayData(req);
        res.status(200).json({ message: 'User updated' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error updating user' });
    }
}));
exports.default = router;
