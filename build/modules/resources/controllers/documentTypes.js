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
const documentTypes_1 = __importDefault(require("../services/documentTypes"));
const listDocumentTypes = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const CountryId = req.query.CountryId;
    const PersonTypeId = req.query.PersonTypeId;
    const documentTypes = yield documentTypes_1.default.getDocumentTypesByPersonTypeAndCountryId(parseInt(CountryId), parseInt(PersonTypeId));
    return documentTypes;
});
const createDocumentType = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const newDocumentType = req.body;
    const documentType = yield documentTypes_1.default.postDocumentType(newDocumentType);
    return documentType;
});
const documentTypesController = { createDocumentType, listDocumentTypes };
exports.default = documentTypesController;
