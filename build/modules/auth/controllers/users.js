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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../database");
const encrypt_1 = require("../utils/encrypt");
const listUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.models.Users.findAll({
        attributes: ['id', 'name', 'documentNumber', 'birthDate', 'email', 'phone', 'isComplete', 'isVerified', 'isBanned', 'isDeleted', 'createdAt', 'updatedAt'],
        include: [database_1.models.DocumentTypes, database_1.models.Countries, database_1.models.Cities, database_1.models.PersonTypes, database_1.models.Roles]
    });
    return users;
});
const createUsers = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield (0, encrypt_1.encrypt)(req.body.password);
    const newUser = yield database_1.models.Users.create({
        name: req.body.name,
        email: req.body.email,
        documentNumber: req.body.documentNumber,
        password: hash,
        phone: req.body.phone,
        birthDate: req.body.birthDate,
        DocumentTypeId: req.body.documentTypeId,
        CountryId: req.body.countryId,
        CityId: req.body.cityId,
        PersonTypeId: req.body.personTypeId,
        RoleId: req.body.roleId
    });
    const _a = newUser.dataValues, { password } = _a, user = __rest(_a, ["password"]);
    return user;
});
const userInfo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.models.Users.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'documentNumber', 'birthDate', 'email', 'phone', 'isComplete', 'isVerified', 'isBanned', 'isDeleted', 'createdAt', 'updatedAt'],
        include: [database_1.models.DocumentTypes, database_1.models.Countries, database_1.models.Cities, database_1.models.PersonTypes, database_1.models.Roles]
    });
    return user;
});
const usersController = { createUsers, listUsers, userInfo };
exports.default = usersController;
