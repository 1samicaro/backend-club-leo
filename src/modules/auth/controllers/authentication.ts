import type { Request } from 'express'

import usersServices from '../services/users'
import type { UserAuthenticated, User } from '../types/users'
const logoutUser = async (req: Request): Promise<void> => {
  const userToken: UserAuthenticated = req.user as UserAuthenticated

  const user: User = await usersServices.getUserById(userToken.id as string)

  if (user === null) {
    throw new Error('User not found')
  }

  const data = {
    lastToken: null
  }

  await usersServices.patchUser(data, user)
}

const authenticationController = { logoutUser }

export default authenticationController
