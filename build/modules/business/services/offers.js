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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../database");
const getOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield database_1.models.Offers.findAll({});
    return offers;
});
const postOffer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newOffer = yield database_1.models.Offers.create(data);
    return newOffer;
});
const deleteOffer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.models.Offers.destroy({ where: { id } });
});
const getOffersByCity = (CityId) => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield database_1.models.Offers.findAll({ where: { CityId } });
    return offers;
});
const offersServices = { postOffer, getOffers, deleteOffer, getOffersByCity };
exports.default = offersServices;
