import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { GendersModel } from '../types/genders'

module.exports = (sequelize: Sequelize) => {
  class Genders extends Model<GendersModel> implements GendersModel {
    id!: number
    name!: string

    static associate (models: Record<string, any>): void {
      console.log(models)
    }
  }
  Genders.init({
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
    modelName: 'Genders',
    timestamps: false
  })
  return Genders
}
