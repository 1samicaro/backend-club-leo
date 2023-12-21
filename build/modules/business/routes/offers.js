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
const offers_1 = __importDefault(require("../controllers/offers"));
const roles_1 = require("../../auth/controllers/roles");
const offers_2 = __importDefault(require("../utils/validator/offers"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield offers_1.default.listOffers();
        res.status(200).json(offers);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting offers' });
    }
}));
router.post('/', passport_1.default.authenticate('jwt', { session: false }), offers_2.default.validateCreateOffers, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthorized = yield (0, roles_1.authorizeUser)(req, 'modify:offers');
        if (!isAuthorized) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const offer = yield offers_1.default.createOffer(req);
        res.status(201).json(offer);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error creating offer' });
    }
}));
router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), offers_2.default.deleteOffer, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthorized = yield (0, roles_1.authorizeUser)(req, 'modify:offers');
        if (!isAuthorized) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        yield offers_1.default.deleteOffer(req);
        res.status(200).json({ message: 'Offer deleted' });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error deleting offer' });
    }
}));
router.get('/byCity/:CityId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield offers_1.default.listOffersByCity(parseInt(req.params.CityId));
        res.status(200).json(offers);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(400).json({ message: 'Error getting offers' });
    }
}));
exports.default = router;
