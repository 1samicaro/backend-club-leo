"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas = {
    newDocumentType: {
        type: 'object',
        required: ['name', 'label'],
        properties: {
            name: {
                type: 'string'
            },
            label: {
                type: 'string'
            },
            personTypeId: {
                type: 'number'
            },
            countryId: {
                type: 'number'
            }
        }
    },
    newCountry: {
        type: 'object',
        required: ['name'],
        properties: {
            name: {
                type: 'string'
            }
        }
    },
    newCity: {
        type: 'object',
        required: ['name', 'countryId'],
        properties: {
            name: {
                type: 'string'
            },
            countryId: {
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
    newGender: {
        type: 'object',
        required: ['name'],
        properties: {
            name: {
                type: 'string'
            }
        }
    },
    newRole: {
        type: 'object',
        required: ['name'],
        properties: {
            name: {
                type: 'string'
            }
        }
    },
    newUser: {
        type: 'object',
        required: ['name', 'email', 'documentNumber', 'password', 'birthDate', 'phone', 'documentTypeId', 'roleId', 'personTypeId', 'cityId', 'countryId'],
        properties: {
            name: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            documentNumber: {
                type: 'string'
            },
            email: {
                type: 'string'
            },
            phone: {
                type: 'string'
            },
            password: {
                type: 'string'
            },
            birthDate: {
                type: 'string'
            },
            documentTypeId: {
                type: 'number'
            },
            roleId: {
                type: 'number'
            },
            personTypeId: {
                type: 'number'
            },
            cityId: {
                type: 'number'
            },
            countryId: {
                type: 'number'
            }
        }
    },
    login: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: {
                type: 'string'
            },
            password: {
                type: 'string'
            }
        }
    }
};
exports.default = schemas;
