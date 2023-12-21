"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class DocumentTypes extends sequelize_1.Model {
        static associate(models) {
            DocumentTypes.belongsTo(models.Countries);
            DocumentTypes.belongsTo(models.PersonTypes);
            DocumentTypes.hasMany(models.Users);
        }
    }
    DocumentTypes.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        label: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'DocumentTypes',
        timestamps: false
    });
    return DocumentTypes;
};
