"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Transactions extends sequelize_1.Model {
        static associate(models) {
            Transactions.belongsTo(models.Users, { as: 'Source' });
            Transactions.belongsTo(models.Users, { as: 'Destination' });
            Transactions.belongsTo(models.Users, { as: 'GeneratedBy' });
        }
    }
    Transactions.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        amount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Transactions',
        timestamps: true
    });
    return Transactions;
};
