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
const users_1 = __importDefault(require("../services/users"));
const logoutUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userToken = req.user;
    const user = yield users_1.default.getUserById(userToken.id);
    if (user === null) {
        throw new Error('User not found');
    }
    const data = {
        lastToken: null
    };
    yield users_1.default.patchUser(data, user);
});
const authenticationController = { logoutUser };
exports.default = authenticationController;
