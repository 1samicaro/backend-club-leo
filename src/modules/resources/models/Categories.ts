import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { CategoriesModel } from '../types/categories'

module.exports = (sequelize: Sequelize) => {
  class Categories extends Model<CategoriesModel> implements CategoriesModel {
    id!: number
    name!: string
    image!: string
    isService!: boolean

    static associate (models: Record<string, any>): void {
      console.log(models)
    }
  }
  Categories.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isService: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Categories',
    timestamps: false
  })
  return Categories
}
