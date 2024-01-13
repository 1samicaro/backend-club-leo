import { Router, type Request, type Response } from 'express'
import passport from 'passport'
import Log from '../../../middlewares/logger'

import additionalTypesValidator from '../utils/validator/additionalTypes'

import additionalTypesController from '../controllers/additionalTypes'
import { authorizeUser } from '../../auth/controllers/roles'

const router = Router()

router.get('/', additionalTypesValidator.validateListAdditionalTypes, async (req: Request, res: Response) => {
  try {
    const genders = await additionalTypesController.listAdditionalTypes(req)
    res.status(200).json(genders)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting additional types' })
  }
})

router.post('/', passport.authenticate('jwt', { session: false }), additionalTypesValidator.validateCreateAdditionalTypes, async (req: Request, res: Response): Promise<void> => {
  try {
    const isAuthorized = await authorizeUser(req, 'create:resources')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const newGender = await additionalTypesController.createAdditionalType(req)
    res.status(201).json(newGender)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating additional type' })
  }
})

export default router
