import jwt from 'jsonwebtoken'
import type { User } from '../../types/users'

const signToken = (user: User, secret: string): string => {
  const token = jwt.sign({ id: user.id, RoleId: user.RoleId }, secret, { expiresIn: '1h' })
  return token
}

const signRefreshToken = (user: User, uuid: string, secret: string): string => {
  const refreshToken = jwt.sign({ id: user.id, lastToken: uuid }, secret, { expiresIn: '7d' })
  return refreshToken
}

export { signToken, signRefreshToken }
