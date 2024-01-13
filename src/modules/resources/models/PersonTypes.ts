import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { PersonTypesModel } from '../types/personTypes'

module.exports = (sequelize: Sequelize) => {
  class PersonTypes extends Model<PersonTypesModel> implements PersonTypesModel {
    id!: number
    name!: string

    static associate (models: Record<string, any>): void {
      PersonTypes.hasMany(models.DocumentTypes)
      PersonTypes.hasMany(models.Users)
    }
  }
  PersonTypes.init({
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
    modelName: 'PersonTypes',
    timestamps: false
  })
  return PersonTypes
}
