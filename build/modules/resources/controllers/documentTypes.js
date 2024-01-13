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
const listDocumentTypes = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { countryId, personTypeId } = req.query;
    const documentTypes = yield database_1.models.DocumentTypes.findAll({
        where: { CountryId: countryId, PersonTypeId: personTypeId }
    });
    return documentTypes;
});
const createDocumentType = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const newDocumentType = yield database_1.models.DocumentTypes.create({
        name: req.body.name,
        label: req.body.label,
        CountryId: req.body.countryId,
        PersonTypeId: req.body.personTypeId
    });
    return newDocumentType;
});
const documentTypesController = { createDocumentType, listDocumentTypes };
exports.default = documentTypesController;
