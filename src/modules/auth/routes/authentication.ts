import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'
import passport from 'passport'

import authenticationValidator from '../utils/validator/authentication'
import authenticationController from '../controllers/authentication'
// import { bruteLimiter } from '../utils/bruteForceLimiter'

const router = Router()

router.post('/login', authenticationValidator.validateAuthentication, passport.authenticate('local', { session: false }), async (req: Request, res: Response) => {
  try {
    const response = req.user as any
    if (response?.isError === true) {
      res.status(401).json(response?.message)
      return
    }

    res.status(200).json(response)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error Authenticating' })
  }
})

router.post('/refresh', passport.authenticate('refresh', { session: false }), async (req: Request, res: Response) => {
  try {
    const response = req.user as any
    if (response?.isError === true) {
      res.status(401).json(response?.message)
      return
    }

    res.status(200).json(response)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error Refreshing' })
  }
})

router.post('/logout', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    await authenticationController.logoutUser(req)
    res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error Logging out' })
  }
})
export default router
