"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const NODE_ENV = process.env.NODE_ENV;
const schemas = {};
const dirPath = (NODE_ENV === 'dev') ? path_1.default.resolve(__dirname, '../../../src/modules') : path_1.default.resolve(__dirname, '../../../build/modules');
const modules = fs_1.default.readdirSync(dirPath);
modules.forEach((folder) => {
    const schemaFile = fs_1.default.readdirSync(path_1.default.join(dirPath, folder, 'docs'));
    schemaFile.forEach((file) => {
        if (file.slice(0, -3) === 'schemas') {
            const route = require(path_1.default.join(dirPath, folder, 'docs', file));
            Object.assign(schemas, route.default);
        }
    });
});
exports.default = schemas;
