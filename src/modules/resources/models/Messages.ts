import { Model, DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

import type { MessagesModel } from '../types/messages'

module.exports = (sequelize: Sequelize) => {
  class Messages extends Model<MessagesModel> implements MessagesModel {
    id!: number
    query!: string
    message!: string[]
    user!: string

    static associate (models: Record<string, any>): void {
      console.log(models)
    }
  }
  Messages.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false
    },
    message: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Messages',
    timestamps: true
  })
  return Messages
}
