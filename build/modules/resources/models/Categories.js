"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Categories extends sequelize_1.Model {
        static associate(models) {
            console.log(models);
        }
    }
    Categories.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        isService: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Categories',
        timestamps: false
    });
    return Categories;
};
