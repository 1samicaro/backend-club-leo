"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas = {
    newRole: {
        type: 'object',
        required: ['name', 'permissions', 'isPossibleToCreate'],
        properties: {
            name: {
                type: 'string'
            },
            permissions: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            isPossibleToCreate: {
                type: 'boolean'
            }
        }
    },
    newUser: {
        type: 'object',
        required: ['name', 'email', 'documentNumber', 'password', 'birthDate', 'phone', 'DocumentTypeId', 'RoleId', 'PersonTypeId', 'CityId', 'CountryId', 'username'],
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
            DocumentTypeId: {
                type: 'number'
            },
            RoleId: {
                type: 'number'
            },
            PersonTypeId: {
                type: 'number'
            },
            CityId: {
                type: 'number'
            },
            CountryId: {
                type: 'number'
            },
            AdditionalTypeId: {
                type: 'number'
            },
            username: {
                type: 'string'
            },
            discount: {
                type: 'object',
                properties: {
                    CategoryId: {
                        type: 'number'
                    }
                }
            },
            Partner: {
                type: 'string'
            },
            Categories: {
                type: 'array',
                items: {
                    type: 'number'
                }
            },
            representName: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            representDocumentNumber: {
                type: 'string'
            },
            representEmail: {
                type: 'string'
            },
            representPhone: {
                type: 'string'
            },
            docs: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            description: {
                type: 'string'
            },
            profilePic: {
                type: 'string'
            }
        }
    },
    patchUser: {
        type: 'object',
        required: [],
        properties: {
            phone: {
                type: 'string'
            },
            password: {
                type: 'string'
            },
            RoleId: {
                type: 'number'
            },
            discount: {
                type: 'object',
                properties: {
                    CategoryId: {
                        type: 'number'
                    }
                }
            },
            Categories: {
                type: 'array',
                items: {
                    type: 'number'
                }
            },
            representName: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            representDocumentNumber: {
                type: 'string'
            },
            representEmail: {
                type: 'string'
            },
            representPhone: {
                type: 'string'
            },
            docs: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            CityId: {
                type: 'number'
            },
            CountryId: {
                type: 'number'
            },
            description: {
                type: 'string'
            },
            profilePic: {
                type: 'string'
            }
        }
    },
    login: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: {
                type: 'string'
            },
            password: {
                type: 'string'
            }
        }
    },
    searchUsers: {
        type: 'object',
        required: [],
        properties: {
            CountryId: {
                type: 'number'
            },
            CityId: {
                type: 'number'
            },
            PersonTypeId: {
                type: 'number'
            },
            AdditionalTypeId: {
                type: 'number'
            }
        }
    }
};
exports.default = schemas;
