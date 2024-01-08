import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { CountriesModel } from '../types/countries'

module.exports = (sequelize: Sequelize) => {
  class Countries extends Model<CountriesModel> implements CountriesModel {
    id!: number
    name!: string
    code!: number

    static associate (models: Record<string, any>): void {
      Countries.hasMany(models.Cities)
      Countries.hasMany(models.DocumentTypes)
      Countries.hasMany(models.Users)
    }
  }
  Countries.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    }
  }, {
    sequelize,
    modelName: 'Countries',
    timestamps: false
  })
  return Countries
}
