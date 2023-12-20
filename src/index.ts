/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import server from './server'
import sequelize from './database'

const PORT = process.env.PORT ?? ''

void sequelize.sync({ force: false, alter: false, logging: console.log }).then(() => {
  server.listen(PORT, () => {
    console.log('Listening at port ' + PORT)
  })
})
