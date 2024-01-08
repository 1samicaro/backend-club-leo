import passport from 'passport'
import { Strategy } from 'passport-local'
import jwt from 'jsonwebtoken'

import { models } from '../../../database'
import { compare } from '../utils/encrypt'
const authStrategies = (): void => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET as string
  const REFRESH_SECRET = process.env.REFRESH_SECRET as string

  passport.use(new Strategy({
    usernameField: 'email', passwordField: 'password'
  }, async (email: string, pass: string, done: any) => {
    try {
      const userDb = await models.Users.findOne({
        where: { email },
        include: [models.DocumentTypes, models.Countries, models.Cities, models.PersonTypes, models.Roles]
      })

      if (userDb === null) {
        return done(null, { message: 'Email or password incorrect' })
      }

      const isCorrect = await compare(pass, userDb.password)

      if (!isCorrect) {
        return done(null, { message: 'Email or password incorrect' })
      }
      const { password, ...user } = userDb.dataValues
      const token = jwt.sign({ id: user.id }, TOKEN_SECRET, { expiresIn: '1h' })
      const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' })

      user.token = token
      user.refreshToken = refreshToken
      return done(null, user)
    } catch (error) {
      done(error)
    }
  }))
}

export default authStrategies
