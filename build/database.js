"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { DATABASE_URL, NODE_ENV } = process.env;
const config = NODE_ENV !== 'dev'
    ? {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
    : {};
const sequelize = new sequelize_1.Sequelize(DATABASE_URL, config);
const modules = fs_1.default.readdirSync(path_1.default.join(__dirname, './modules'));
modules.forEach((folder) => {
    const modelFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, 'modules', folder, 'models'));
    modelFiles.forEach((file) => {
        const model = require(path_1.default.join(__dirname, 'modules', folder, 'models', file));
        model(sequelize);
    });
});
exports.models = sequelize.models;
Object.keys(exports.models).forEach(modelName => {
    if (exports.models[modelName].associate !== undefined) {
        exports.models[modelName].associate(exports.models);
    }
});
exports.default = sequelize;
