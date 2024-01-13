"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Roles extends sequelize_1.Model {
        static associate(models) {
            Roles.hasMany(models.Users);
        }
    }
    Roles.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        permissions: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING)
        },
        isPossibleToCreate: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Roles',
        timestamps: false
    });
    return Roles;
};
