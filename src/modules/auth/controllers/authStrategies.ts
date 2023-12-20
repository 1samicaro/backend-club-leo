import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { compare } from '../utils/encrypt'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { v4 as uuidv4 } from 'uuid'

import { signToken, signRefreshToken } from '../utils/signTokens'
import usersServices from '../services/users'
import type { UserAuthenticated } from '../types/users'

const authStrategies = (): void => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET as string
  const REFRESH_SECRET = process.env.REFRESH_SECRET as string

  passport.use(new LocalStrategy({
    usernameField: 'username', passwordField: 'password'
  }, async (username: string, pass: string, done: any) => {
    try {
      const userData: UserAuthenticated = await usersServices.getUserByUsernameLog(username)

      if (userData === null) {
        return done(null, { isError: true, message: 'Username or password incorrect' })
      }

      const isCorrect = await compare(pass, userData.password as string)

      if (!isCorrect) {
        return done(null, { isError: true, message: 'Username or password incorrect' })
      }

      if (userData.isBanned === true) {
        return done(null, { isError: true, message: 'User is banned' })
      }
      if (userData.isDeleted === true) {
        return done(null, { isError: true, message: 'User is deleted' })
      }
      if (userData.isVerified === false) {
        return done(null, { isError: true, message: 'User is not verified' })
      }

      const { password, lastToken, ...user } = userData.dataValues as UserAuthenticated

      const token = signToken(user, TOKEN_SECRET)
      const tokenId = uuidv4()
      const refreshToken = signRefreshToken(user, tokenId, REFRESH_SECRET)

      await usersServices.patchUser({ lastToken: tokenId }, userData)

      const response = {
        isAuthenticated: true,
        token: { token, expiresIn: '1h' },
        refreshToken: { refreshToken, expiresIn: '7d' },
        user
      }

      return done(null, response)
    } catch (error) {
      return done(error, { isError: true, message: 'Email or password incorrect' })
    }
  }))

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: TOKEN_SECRET
  }, async (payload: any, done: any) => {
    try {
      return done(null, payload)
    } catch (error) {
      return done(error, { isError: true, message: 'Invalid token' })
    }
  }))

  passport.use('refresh', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('refreshtoken'),
    secretOrKey: REFRESH_SECRET
  }, async (payload: any, done: any) => {
    try {
      const userData: UserAuthenticated = await usersServices.getUserById(payload.id)

      if (userData.lastToken !== payload.lastToken) {
        return done(null, { isError: true, message: 'Invalid refresh token' })
      }

      const { password, lastToken, ...user } = userData.dataValues as UserAuthenticated

      const token = signToken(user, TOKEN_SECRET)
      const tokenId = uuidv4()
      const refreshToken = signRefreshToken(user, tokenId, REFRESH_SECRET)

      await usersServices.patchUser({ lastToken: tokenId }, userData)

      const response = {
        id: user.id,
        token: { token, expiresIn: '1h' },
        refreshToken: { refreshToken, expiresIn: '7d' }
      }

      return done(null, response)
    } catch (error) {
      return done(error, { isError: true, message: 'Invalid refresh token' })
    }
  }))
}

export default authStrategies
