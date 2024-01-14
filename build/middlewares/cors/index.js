'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const whitelist = ['http://localhost:3000', 'http://localhost:4000', 'https://biblioleo-700ad891664c.herokuapp.com', 'https://biblioleo-frontend-86a57065d2f7.herokuapp.com', 'https://pelagic-cocoa-382420.rj.r.appspot.com', 'http://localhost:4200', 'https://mingga.net', 'https://admin-mingga.vercel.app'];
const corsConfig = {
    origin: function (origin, response) {
        if (whitelist.includes(origin) || origin === undefined) {
            response(null, true);
        }
        else {
            logger_1.default.error('Origin not allowed ' + origin);
            response('Origin not allowed');
        }
    }
};
exports.default = corsConfig;
