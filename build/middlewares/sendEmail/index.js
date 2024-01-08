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
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: 'minggarmb@gmail.com',
        pass: 'eoqduodlxxinwlbq'
    },
    secure: true
});
const sendEmail = (email, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    const mailData = {
        from: 'minggarmb@gmail.com',
        to: email,
        subject,
        text,
        html
    };
    transporter.sendMail(mailData, function (err, info) {
        if (err !== undefined)
            console.log('mail not sent');
        else
            console.log('mail sent');
    });
});
exports.default = sendEmail;
