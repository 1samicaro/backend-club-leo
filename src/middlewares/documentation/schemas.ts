import fs from 'fs'
import path from 'path'

const NODE_ENV = process.env.NODE_ENV as string

const schemas = {}
const dirPath = (NODE_ENV === 'dev') ? path.resolve(__dirname, '../../../src/modules') : path.resolve(__dirname, '../../../build/modules')

const modules: string[] = fs.readdirSync(dirPath)

modules.forEach((folder: string) => {
  const schemaFile = fs.readdirSync(path.join(dirPath, folder, 'docs'))
  schemaFile.forEach((file: string) => {
    if (file.slice(0, -3) === 'schemas') {
      const route = require(path.join(dirPath, folder, 'docs', file))
      Object.assign(schemas, route.default)
    }
  })
})

export default schemas
