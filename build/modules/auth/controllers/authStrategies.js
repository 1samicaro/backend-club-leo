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
const encrypt_1 = require("../utils/encrypt");
const passport_jwt_1 = require("passport-jwt");
const uuid_1 = require("uuid");
const signTokens_1 = require("../utils/signTokens");
const users_1 = __importDefault(require("../services/users"));
const authStrategies = () => {
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    const REFRESH_SECRET = process.env.REFRESH_SECRET;
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: 'username', passwordField: 'password'
    }, (username, pass, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = yield users_1.default.getUserByUsernameLog(username);
            if (userData === null) {
                return done(null, { isError: true, message: 'Username or password incorrect' });
            }
            const isCorrect = yield (0, encrypt_1.compare)(pass, userData.password);
            if (!isCorrect) {
                return done(null, { isError: true, message: 'Username or password incorrect' });
            }
            if (userData.isBanned === true) {
                return done(null, { isError: true, message: 'User is banned' });
            }
            if (userData.isDeleted === true) {
                return done(null, { isError: true, message: 'User is deleted' });
            }
            if (userData.isVerified === false) {
                return done(null, { isError: true, message: 'User is not verified' });
            }
            const _a = userData.dataValues, { password, lastToken } = _a, user = __rest(_a, ["password", "lastToken"]);
            const token = (0, signTokens_1.signToken)(user, TOKEN_SECRET);
            const tokenId = (0, uuid_1.v4)();
            const refreshToken = (0, signTokens_1.signRefreshToken)(user, tokenId, REFRESH_SECRET);
            yield users_1.default.patchUser({ lastToken: tokenId }, userData);
            const response = {
                isAuthenticated: true,
                token: { token, expiresIn: '1h' },
                refreshToken: { refreshToken, expiresIn: '7d' },
                user
            };
            return done(null, response);
        }
        catch (error) {
            return done(error, { isError: true, message: 'Email or password incorrect' });
        }
    })));
    passport_1.default.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: TOKEN_SECRET
    }, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return done(null, payload);
        }
        catch (error) {
            return done(error, { isError: true, message: 'Invalid token' });
        }
    })));
    passport_1.default.use('refresh', new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('refreshtoken'),
        secretOrKey: REFRESH_SECRET
    }, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = yield users_1.default.getUserById(payload.id);
            if (userData.lastToken !== payload.lastToken) {
                return done(null, { isError: true, message: 'Invalid refresh token' });
            }
            const _a = userData.dataValues, { password, lastToken } = _a, user = __rest(_a, ["password", "lastToken"]);
            const token = (0, signTokens_1.signToken)(user, TOKEN_SECRET);
            const tokenId = (0, uuid_1.v4)();
            const refreshToken = (0, signTokens_1.signRefreshToken)(user, tokenId, REFRESH_SECRET);
            yield users_1.default.patchUser({ lastToken: tokenId }, userData);
            const response = {
                id: user.id,
                token: { token, expiresIn: '1h' },
                refreshToken: { refreshToken, expiresIn: '7d' }
            };
            return done(null, response);
        }
        catch (error) {
            return done(error, { isError: true, message: 'Invalid refresh token' });
        }
    })));
};
exports.default = authStrategies;
