"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const roles_1 = __importStar(require("../controllers/roles"));
const roles_2 = __importDefault(require("../utils/validator/roles"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield roles_1.default.listRoles();
        res.status(200).json(roles);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting roles' });
    }
}));
router.get('/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthorized = yield (0, roles_1.authorizeUser)(req, 'read:roles');
        if (!isAuthorized) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const role = yield roles_1.default.roleInfo(req);
        res.status(200).json(role);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting role' });
    }
}));
router.post('/', passport_1.default.authenticate('jwt', { session: false }), roles_2.default.validateCreateRoles, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthorized = yield (0, roles_1.authorizeUser)(req, 'create:roles');
        if (!isAuthorized) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const newRole = yield roles_1.default.createRoles(req);
        res.status(201).json(newRole);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error creating role' });
    }
}));
exports.default = router;
