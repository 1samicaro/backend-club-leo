"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Users extends sequelize_1.Model {
        static associate(models) {
            Users.belongsTo(models.Countries);
            Users.belongsTo(models.Roles);
            Users.belongsTo(models.PersonTypes);
            Users.belongsTo(models.DocumentTypes);
            Users.belongsTo(models.AdditionalTypes);
            Users.belongsTo(models.Users, { as: 'Partner' });
            Users.belongsTo(models.Users, { as: 'GrandPartner' });
            Users.belongsTo(models.Users, { as: 'GreatGrandPartner' });
            Users.hasMany(models.Offers);
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
            allowNull: false
        },
        birthDate: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false
        },
        lastToken: {
            type: sequelize_1.DataTypes.STRING
        },
        isVerified: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        },
        isBanned: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        isDeleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        discount: {
            type: sequelize_1.DataTypes.JSONB,
            allowNull: true
        },
        totalPoints: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0
        },
        totalSpent: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0
        },
        debt: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0
        },
        remainingReferrals: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 10
        },
        representName: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: true
        },
        representDocumentNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        representEmail: {
            type: sequelize_1.DataTypes.STRING,
            validate: { isEmail: true },
            allowNull: true
        },
        representPhone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        docs: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: true
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        website: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        profilePic: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        isApproved: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        },
        isSuscribed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        suscriptionDate: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Users',
        timestamps: true
    });
    return Users;
};
