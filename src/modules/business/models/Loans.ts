import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'
import type { LoansModel } from '../types/loans'

module.exports = (sequelize: Sequelize) => {
  class Loans extends Model<LoansModel> implements LoansModel {
    id!: string
    debt!: number
    numberQuotas!: number
    actualQuota!: number
    status!: string
    nextPaydate!: Date

    static associate (models: Record<string, any>): void {
      Loans.belongsTo(models.Users)
    }
  }

  Loans.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    debt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numberQuotas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    actualQuota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nextPaydate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Loans',
    timestamps: true
  })
}
