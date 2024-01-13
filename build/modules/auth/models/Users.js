"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Users extends sequelize_1.Model {
        static associate(models) {
            Users.belongsTo(models.Countries);
            Users.belongsTo(models.Cities);
            Users.belongsTo(models.Roles);
            Users.belongsTo(models.PersonTypes);
            Users.belongsTo(models.DocumentTypes);
        }
    }
    Users.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false
        },
        documentNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            validate: { isEmail: true },
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        birthDate: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false
        },
        isComplete: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        isVerified: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        isBanned: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        isDeleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Users',
        timestamps: true
    });
    return Users;
};
