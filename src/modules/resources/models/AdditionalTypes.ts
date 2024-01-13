import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { AdditionalTypesModel } from '../types/additionalTypes.js'

module.exports = (sequelize: Sequelize) => {
  class AdditionalTypes extends Model<AdditionalTypesModel> implements AdditionalTypesModel {
    id!: number
    name!: string

    static associate (models: Record<string, any>): void {
      AdditionalTypes.belongsTo(models.PersonTypes)
      AdditionalTypes.hasMany(models.Users)
    }
  }
  AdditionalTypes.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'AdditionalTypes',
    timestamps: false
  })
  return AdditionalTypes
}
