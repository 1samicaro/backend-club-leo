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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../../../database");
const encrypt_1 = require("../utils/encrypt");
const authStrategies = () => {
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    const REFRESH_SECRET = process.env.REFRESH_SECRET;
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: 'email', passwordField: 'password'
    }, (email, pass, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDb = yield database_1.models.Users.findOne({
                where: { email },
                include: [database_1.models.DocumentTypes, database_1.models.Countries, database_1.models.Cities, database_1.models.PersonTypes, database_1.models.Roles]
            });
            if (userDb === null) {
                return done(null, { message: 'Email or password incorrect' });
            }
            const isCorrect = yield (0, encrypt_1.compare)(pass, userDb.password);
            if (!isCorrect) {
                return done(null, { message: 'Email or password incorrect' });
            }
            const _a = userDb.dataValues, { password } = _a, user = __rest(_a, ["password"]);
            const token = jsonwebtoken_1.default.sign({ id: user.id }, TOKEN_SECRET, { expiresIn: '1h' });
            const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
            user.token = token;
            user.refreshToken = refreshToken;
            return done(null, user);
        }
        catch (error) {
            done(error);
        }
    })));
};
exports.default = authStrategies;
