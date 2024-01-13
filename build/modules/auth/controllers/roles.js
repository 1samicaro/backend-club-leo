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
const listRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield database_1.models.Roles.findAll();
    return roles;
});
const createRoles = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const newRole = yield database_1.models.Roles.create({
        name: req.body.name
    });
    return newRole;
});
const rolesController = { createRoles, listRoles };
exports.default = rolesController;
