import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const router = Router({ strict: true })

const modules: string[] = fs.readdirSync(path.join(__dirname, './modules'))

modules.forEach((folder: string) => {
  const routeFiles = fs.readdirSync(path.join(__dirname, 'modules', folder, 'routes'))
  routeFiles.forEach((file: string) => {
    const route = require(path.join(__dirname, 'modules', folder, 'routes', file))
    router.use(`/${folder}/${file.slice(0, -3)}`, route.default)
  })
})

export default router
