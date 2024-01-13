import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'
import passport from 'passport'

import authenticationValidator from '../utils/validator/authentication'

const router = Router()

router.post('/', authenticationValidator.validateAuthentication, passport.authenticate('local', { session: false }), async (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting roles' })
  }
})

export default router
