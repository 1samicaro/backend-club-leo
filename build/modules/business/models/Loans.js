"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Loans extends sequelize_1.Model {
        static associate(models) {
            Loans.belongsTo(models.Users);
        }
    }
    Loans.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        debt: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        numberQuotas: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        actualQuota: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        nextPaydate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Loans',
        timestamps: true
    });
};
