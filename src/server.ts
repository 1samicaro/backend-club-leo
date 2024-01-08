import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import favicon from 'serve-favicon'
import path from 'path'
// import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
import authStrategies from './modules/auth/controllers/authStrategies'
// import enforce from 'express-sslify'

import { error404, generalErrorHandler } from './middlewares/errors'
// import { rateLimiter } from './middlewares/rateLimiter'
import corsConfig from './middlewares/cors'
import httpLogger from './middlewares/logger/httpLogger'

import routes from './routes'
// import documentation from './middlewares/documentation'

const server = express()

server.use(helmet())
server.use(express.urlencoded({ extended: true, limit: '100kb' }))
server.use(express.json({ limit: '100kb' }))
// server.use(enforce.HTTPS())
server.use(httpLogger)
server.use(favicon(path.join(__dirname, '../assets/Server.png')))
// server.use(rateLimiter)
server.use(cors(corsConfig))

server.use(passport.initialize())
authStrategies()

// server.use('/documentation', swaggerUi.serve, swaggerUi.setup(documentation))
server.use('/', routes)

server.use(error404)
server.use(generalErrorHandler)

export default server
