import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'

import usersController from '../controllers/users'
import usersValidator from '../utils/validator/users'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await usersController.listUsers()
    res.status(200).json(users)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting users' })
  }
})

router.post('/', usersValidator.validateCreateUsers, async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await usersController.createUsers(req)
    res.status(201).json(newUser)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating user' })
  }
})

router.get('/:id', usersValidator.validateUserInfo, async (req: Request, res: Response) => {
  try {
    const user = await usersController.userInfo(req)
    res.status(200).json(user)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting user' })
  }
})

export default router
