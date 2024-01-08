import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { CitiesModel } from '../types/cities'

module.exports = (sequelize: Sequelize) => {
  class Cities extends Model<CitiesModel> implements CitiesModel {
    id!: number
    name!: string

    static associate (models: Record<string, any>): void {
      Cities.belongsTo(models.Countries)
      Cities.hasMany(models.Users)
    }
  }
  Cities.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cities',
    timestamps: false
  })
  return Cities
}
