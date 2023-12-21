"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Cities extends sequelize_1.Model {
        static associate(models) {
            Cities.belongsTo(models.Countries);
            Cities.hasMany(models.Users);
            Cities.hasMany(models.Offers);
        }
    }
    Cities.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Cities',
        timestamps: false
    });
    return Cities;
};
