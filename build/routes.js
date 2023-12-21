"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)({ strict: true });
const modules = fs_1.default.readdirSync(path_1.default.join(__dirname, './modules'));
modules.forEach((folder) => {
    const routeFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, 'modules', folder, 'routes'));
    routeFiles.forEach((file) => {
        const route = require(path_1.default.join(__dirname, 'modules', folder, 'routes', file));
        router.use(`/${folder}/${file.slice(0, -3)}`, route.default);
    });
});
exports.default = router;
