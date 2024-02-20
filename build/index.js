"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = __importDefault(require("./server"));
const database_1 = __importDefault(require("./database"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '';
void database_1.default.sync({ force: false, alter: true, logging: console.log }).then(() => {
    server_1.default.listen(PORT, () => {
        console.log('Listening at port ' + PORT);
    });
});
