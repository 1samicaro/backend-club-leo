import { Router, type Request, type Response } from 'express'
import passport from 'passport'

import Log from '../../../middlewares/logger'

import citiesController from '../controllers/cities'
import citiesValidator from '../utils/validator/cities'
import { authorizeUser } from '../../auth/controllers/roles'

const router = Router()

router.get('/', citiesValidator.validateListCities, async (req: Request, res: Response) => {
  try {
    const cities = await citiesController.listCities(req)
    res.status(200).json(cities)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting cities' })
  }
})

router.post('/', passport.authenticate('jwt', { session: false }), citiesValidator.validateCreateCity, async (req: Request, res: Response): Promise<void> => {
  try {
    const isAuthorized = await authorizeUser(req, 'create:resources')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const newCity = await citiesController.createCities(req)
    res.status(201).json(newCity)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating city' })
  }
})

export default router
