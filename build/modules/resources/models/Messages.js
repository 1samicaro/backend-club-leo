"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Messages extends sequelize_1.Model {
        static associate(models) {
            console.log(models);
        }
    }
    Messages.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        query: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: false
        },
        message: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
            allowNull: false
        },
        user: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Messages',
        timestamps: true
    });
    return Messages;
};
