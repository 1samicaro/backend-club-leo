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
const getMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield database_1.models.Messages.findAll();
    return messages;
});
const postMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = yield database_1.models.Messages.create(data);
    return newMessage;
});
const messagesServices = { postMessage, getMessages };
exports.default = messagesServices;
