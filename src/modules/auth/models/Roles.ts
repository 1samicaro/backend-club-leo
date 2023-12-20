import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { RolesModel } from '../types/roles'

module.exports = (sequelize: Sequelize) => {
  class Roles extends Model<RolesModel> implements RolesModel {
    id!: number
    name!: string
    permissions!: string[]
    isPossibleToCreate!: boolean

    static associate (models: Record<string, any>): void {
      Roles.hasMany(models.Users)
    }
  }
  Roles.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    isPossibleToCreate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Roles',
    timestamps: false
  })
  return Roles
}
