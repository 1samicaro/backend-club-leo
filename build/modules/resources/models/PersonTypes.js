"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class PersonTypes extends sequelize_1.Model {
        static associate(models) {
            PersonTypes.hasMany(models.DocumentTypes);
            PersonTypes.hasMany(models.Users);
        }
    }
    PersonTypes.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'PersonTypes',
        timestamps: false
    });
    return PersonTypes;
};
