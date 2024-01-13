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
const getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield database_1.models.Roles.findAll({
        attributes: ['id', 'name', 'isPossibleToCreate']
    });
    return roles;
});
const postRole = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newRole = yield database_1.models.Roles.create(data);
    return newRole;
});
const getRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield database_1.models.Roles.findByPk(id, { raw: true });
    return role;
});
const rolesServices = { postRole, getRoles, getRoleById };
exports.default = rolesServices;
