import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'

const { DATABASE_URL, NODE_ENV } = process.env

const config = NODE_ENV !== 'dev'
  ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  : {}

const sequelize = new Sequelize(DATABASE_URL as string, config)

const modules: string[] = fs.readdirSync(path.join(__dirname, './modules'))
modules.forEach((folder: string) => {
  const modelFiles = fs.readdirSync(path.join(__dirname, 'modules', folder, 'models'))
  modelFiles.forEach((file: string) => {
    const model = require(path.join(__dirname, 'modules', folder, 'models', file))
    model(sequelize)
  })
})

type Models = Record<string, any>
export const models: Models = sequelize.models

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate !== undefined) {
    models[modelName].associate(models)
  }
})

export default sequelize
