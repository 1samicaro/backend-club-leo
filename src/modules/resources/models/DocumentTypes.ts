import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { DocumentTypesModel } from '../types/documentTypes'

module.exports = (sequelize: Sequelize) => {
  class DocumentTypes extends Model<DocumentTypesModel> implements DocumentTypesModel {
    id!: number
    name!: string
    label!: string

    static associate (models: Record<string, any>): void {
      DocumentTypes.belongsTo(models.Countries)
      DocumentTypes.belongsTo(models.PersonTypes)
      DocumentTypes.hasMany(models.Users)
    }
  }
  DocumentTypes.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DocumentTypes',
    timestamps: false
  })
  return DocumentTypes
}
