import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'
import type { OffersModel } from '../types/offers'

module.exports = (sequelize: Sequelize) => {
  class Offers extends Model<OffersModel> implements OffersModel {
    id!: number
    name!: string
    image!: string
    url!: string

    static associate (models: Record<string, any>): void {
      Offers.belongsTo(models.Cities)
    }
  }
  Offers.init({
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
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Offers',
    timestamps: false
  })
}
