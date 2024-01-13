import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { UsersModel } from '../types/users'

module.exports = (sequelize: Sequelize) => {
  class Users extends Model<UsersModel> implements UsersModel {
    id!: string
    name!: string[]
    documentNumber!: string
    email!: string
    password!: string
    phone!: string
    isComplete!: boolean
    isVerified!: boolean
    isBanned!: boolean
    isDeleted!: boolean
    birthDate!: Date

    static associate (models: Record<string, any>): void {
      Users.belongsTo(models.Countries)
      Users.belongsTo(models.Cities)
      Users.belongsTo(models.Roles)
      Users.belongsTo(models.PersonTypes)
      Users.belongsTo(models.DocumentTypes)
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
      allowNull: false,
      unique: true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: true
  })
  return Users
}
