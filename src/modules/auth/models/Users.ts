import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { UsersModel, discounts } from '../types/users'

module.exports = (sequelize: Sequelize) => {
  class Users extends Model<UsersModel> implements UsersModel {
    id!: string
    name!: string[]
    documentNumber!: string
    email!: string
    password!: string
    phone!: string
    lastToken!: string
    isVerified!: boolean
    isBanned!: boolean
    isDeleted!: boolean
    birthDate!: Date
    username!: string
    discount!: discounts
    totalPoints!: number
    totalSpent!: number
    remainingReferrals!: number
    representName!: string[]
    representDocumentNumber!: string
    representEmail!: string
    representPhone!: string
    docs!: string[]
    address!: string
    website!: string
    description!: string
    profilePic!: string
    debt!: number
    isApproved!: boolean
    isSuscribed!: boolean
    suscriptionDate!: Date
    transferType!: string
    transferId!: string

    static associate (models: Record<string, any>): void {
      Users.belongsTo(models.Countries)
      Users.belongsTo(models.Roles)
      Users.belongsTo(models.PersonTypes)
      Users.belongsTo(models.DocumentTypes)
      Users.belongsTo(models.AdditionalTypes)
      Users.belongsTo(models.Users, { as: 'Partner' })
      Users.belongsTo(models.Users, { as: 'GrandPartner' })
      Users.belongsTo(models.Users, { as: 'GreatGrandPartner' })
      Users.hasMany(models.Offers)
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    lastToken: {
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    discount: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    totalPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalSpent: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    debt: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    remainingReferrals: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    representName: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    representDocumentNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    representEmail: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: true
    },
    representPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    docs: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isSuscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    suscriptionDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    transferType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transferId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: true
  })
  return Users
}
