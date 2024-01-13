"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const responses_1 = __importDefault(require("./responses"));
const schemas_1 = __importDefault(require("./schemas"));
const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Backtemplate',
        version: '0.0.1'
    },
    servers: [
        {
            url: 'https://pelagic-cocoa-382420.rj.r.appspot.com'
        },
        {
            url: 'http://localhost:4000'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        responses: responses_1.default,
        schemas: schemas_1.default
    }
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ['./src/modules/**/docs/*.ts']
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
