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
exports.authorizeUser = void 0;
const roles_1 = __importDefault(require("../services/roles"));
const listRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_1.default.getRoles();
    return roles;
});
const createRoles = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const newRole = yield roles_1.default.postRole(data);
    return newRole;
});
const roleInfo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const role = yield roles_1.default.getRoleById(parseInt(id));
    return role;
});
const authorizeUser = (req, permissionRequired) => __awaiter(void 0, void 0, void 0, function* () {
    const { RoleId } = req.user;
    const role = yield roles_1.default.getRoleById(parseInt(RoleId));
    if (role.name === 'Root') {
        return true;
    }
    if (role.permissions.includes(permissionRequired)) {
        return true;
    }
    return false;
});
exports.authorizeUser = authorizeUser;
const rolesController = { createRoles, listRoles, roleInfo };
exports.default = rolesController;
