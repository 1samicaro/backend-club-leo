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
const offers_1 = __importDefault(require("../services/offers"));
const listOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield offers_1.default.getOffers();
    return offers;
});
const createOffer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const newOffer = yield offers_1.default.postOffer(data);
    return newOffer;
});
const deleteOffer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield offers_1.default.deleteOffer(id);
});
const listOffersByCity = (CityId) => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield offers_1.default.getOffersByCity(CityId);
    return offers;
});
const offersController = { createOffer, listOffers, deleteOffer, listOffersByCity };
exports.default = offersController;
