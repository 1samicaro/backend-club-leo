import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'

import countriesController from '../controllers/countries'
import countriesValidator from '../utils/validator/countries'

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

router.post('/', countriesValidator.validateCreateCountry, async (req: Request, res: Response): Promise<void> => {
  try {
    const newCountry = await countriesController.createCountries(req)
    res.status(201).json(newCountry)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating country' })
  }
})

export default router
