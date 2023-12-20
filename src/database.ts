import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'

require('dotenv').config()
const { DATABASE_URL } = process.env

const config = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

console.log('aaa ', process.env.DATABASE_URL)
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
