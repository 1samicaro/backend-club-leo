import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'
import type { TransactionModel } from '../types/transactions'
module.exports = (sequelize: Sequelize) => {
  class Transactions extends Model<TransactionModel> implements TransactionModel {
    id!: number
    amount!: number
    type!: string

    static associate (models: Record<string, any>): void {
      Transactions.belongsTo(models.Users, { as: 'Source' })
      Transactions.belongsTo(models.Users, { as: 'Destination' })
      Transactions.belongsTo(models.Users, { as: 'GeneratedBy' })
    }
  }
  Transactions.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transactions',
    timestamps: true
  })
  return Transactions
}
