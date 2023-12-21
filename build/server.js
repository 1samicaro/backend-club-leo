"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
// import swaggerUi from 'swagger-ui-express'
const passport_1 = __importDefault(require("passport"));
const authStrategies_1 = __importDefault(require("./modules/auth/controllers/authStrategies"));
// import enforce from 'express-sslify'
const errors_1 = require("./middlewares/errors");
// import { rateLimiter } from './middlewares/rateLimiter'
const cors_2 = __importDefault(require("./middlewares/cors"));
const httpLogger_1 = __importDefault(require("./middlewares/logger/httpLogger"));
const routes_1 = __importDefault(require("./routes"));
// import documentation from './middlewares/documentation'
const server = (0, express_1.default)();
server.use((0, helmet_1.default)());
server.use(express_1.default.urlencoded({ extended: true, limit: '100kb' }));
server.use(express_1.default.json({ limit: '100kb' }));
// server.use(enforce.HTTPS())
server.use(httpLogger_1.default);
server.use((0, serve_favicon_1.default)(path_1.default.join(__dirname, '../assets/Server.png')));
// server.use(rateLimiter)
server.use((0, cors_1.default)(cors_2.default));
server.use(passport_1.default.initialize());
(0, authStrategies_1.default)();
// server.use('/documentation', swaggerUi.serve, swaggerUi.setup(documentation))
server.use('/', routes_1.default);
server.use(errors_1.error404);
server.use(errors_1.generalErrorHandler);
exports.default = server;
