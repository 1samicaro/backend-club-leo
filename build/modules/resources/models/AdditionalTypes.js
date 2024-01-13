"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class AdditionalTypes extends sequelize_1.Model {
        static associate(models) {
            AdditionalTypes.belongsTo(models.PersonTypes);
            AdditionalTypes.hasMany(models.Users);
        }
    }
    AdditionalTypes.init({
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
        modelName: 'AdditionalTypes',
        timestamps: false
    });
    return AdditionalTypes;
};
