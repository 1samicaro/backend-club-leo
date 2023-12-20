import { Router, type Request, type Response } from 'express'
import passport from 'passport'

import Log from '../../../middlewares/logger'

import countriesController from '../controllers/countries'
import countriesValidator from '../utils/validator/countries'
import { authorizeUser } from '../../auth/controllers/roles'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const countries = await countriesController.listCountries()
    res.status(200).json(countries)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting countries' })
  }
})

router.post('/', passport.authenticate('jwt', { session: false }), countriesValidator.validateCreateCountry, async (req: Request, res: Response): Promise<void> => {
  try {
    const isAuthorized = await authorizeUser(req, 'create:resources')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const newCountry = await countriesController.createCountries(req)
    res.status(201).json(newCountry)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating country' })
  }
})

export default router
