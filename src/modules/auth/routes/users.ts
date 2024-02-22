import { Router, type Request, type Response } from 'express'
import passport from 'passport'

import Log from '../../../middlewares/logger'

import usersController from '../controllers/users'
import usersValidator from '../utils/validator/users'
import { authorizeUser } from '../controllers/roles'
import mercadopago from 'mercadopago'

const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const isAuthorized = await authorizeUser(req, 'read:users')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const users = await usersController.listUsers()
    res.status(200).json(users)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting users' })
  }
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    Log.error('req.body', req.body)
    const newUser = await usersController.createUsers(req)
    res.status(201).json(newUser)
  } catch (error: any) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating user' })
  }
})

router.patch('/', usersValidator.validateUpdateUsers, passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    await usersController.updateUserById(req)
    res.status(200).json({ message: 'User updated' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error updating user' })
  }
})

router.get('/descendants', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const descendants = await usersController.listDescendants(req)
    res.status(200).json(descendants)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting descendants' })
  }
})

router.patch('/verify/:id', passport.authenticate('jwt', { session: false }), usersValidator.validateUserInfo, async (req: Request, res: Response) => {
  try {
    const isAuthorized = await authorizeUser(req, 'update:users')
    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    await usersController.verifyUserById(req)
    res.status(200).json({ message: 'User verified' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error verifying user' })
  }
})

router.delete('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    await usersController.deleteUserById(req)
    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error deleting user' })
  }
})

router.patch('/ban/:id', passport.authenticate('jwt', { session: false }), usersValidator.validateUserInfo, async (req: Request, res: Response) => {
  try {
    const isAuthorized = await authorizeUser(req, 'update:users')
    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    await usersController.banUserById(req)
    res.status(200).json({ message: 'User banned' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error banning user' })
  }
})

router.get('/:id', passport.authenticate('jwt', { session: false }), usersValidator.validateUserInfo, async (req: Request, res: Response) => {
  try {
    const user = await usersController.userInfo(req)
    res.status(200).json(user)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting user' })
  }
})

router.post('/search', passport.authenticate('jwt', { session: false }), usersValidator.validateSearchUsers, async (req: Request, res: Response) => {
  try {
    const isAuthorized = await authorizeUser(req, 'read:users')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const users = await usersController.searchUsers(req)
    res.status(200).json(users)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting users' })
  }
})

router.get('/reset/:username', async (req: Request, res: Response) => {
  try {
    await usersController.resetPassword(req)
    res.status(200).json({ message: 'mail send' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error sending mail' })
  }
})

router.get('/resetVerify/:username/:id', async (req: Request, res: Response) => {
  try {
    await usersController.resetPasswordVerify(req)
    res.status(200).json({ message: 'Password reset' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error resetting password' })
  }
})

router.post('/paySuscription', async (req: Request, res: Response) => {
  try {
    const preference = {
      items: [
        {
          title: 'Suscripcion',
          unit_price: 50000,
          quantity: 1
        }
      ],
      back_urls: {
        success: 'www.clubleo.net',
        failure: 'www.clubleo.net',
        pending: 'www.clubleo.net'
      },
      auto_return: 'approved'
    } as any
    mercadopago.configure({
      access_token: 'TEST-6830219983343019-022211-ebf8e9cfc1cecb54274c86d0aaeb74cf-1680049721'
    })
    const response = await mercadopago.preferences.create(preference)
    res.status(200).json(response)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error sending mail' })
  }
})

export default router
