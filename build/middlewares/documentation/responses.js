"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses = {
    200: {
        description: 'Success.'
    },
    400: {
        description: 'Bad request.'
    },
    401: {
        description: 'Invalid User.'
    },
    403: {
        description: 'Invalid Role.'
    },
    422: {
        description: 'Validation error.'
    },
    426: {
        description: 'Upgrade Required.'
    }
};
exports.default = responses;
