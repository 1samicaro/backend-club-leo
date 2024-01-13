"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas = {
    newDocumentType: {
        type: 'object',
        required: ['name', 'label', 'PersonTypeId', 'CountryId'],
        properties: {
            name: {
                type: 'string'
            },
            label: {
                type: 'string'
            },
            PersonTypeId: {
                type: 'number'
            },
            CountryId: {
                type: 'number'
            }
        }
    },
    newCountry: {
        type: 'object',
        required: ['name', 'code'],
        properties: {
            name: {
                type: 'string'
            },
            code: {
                type: 'string'
            }
        }
    },
    newCity: {
        type: 'object',
        required: ['name', 'CountryId'],
        properties: {
            name: {
                type: 'string'
            },
            CountryId: {
                type: 'number'
            }
        }
    },
    newPersonType: {
        type: 'object',
        required: ['name'],
        properties: {
            name: {
                type: 'string'
            }
        }
    },
    newAdditionalType: {
        type: 'object',
        required: ['name', 'PersonTypeId'],
        properties: {
            name: {
                type: 'string'
            },
            PersonTypeId: {
                type: 'number'
            }
        }
    },
    newCategory: {
        type: 'object',
        required: ['name', 'image', 'isService'],
        properties: {
            name: {
                type: 'string'
            },
            image: {
                type: 'string'
            },
            isService: {
                type: 'boolean'
            }
        }
    },
    newMessage: {
        type: 'object',
        required: ['query', 'message', 'user'],
        properties: {
            query: {
                type: 'string'
            },
            message: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            user: {
                type: 'string'
            }
        }
    }
};
exports.default = schemas;
