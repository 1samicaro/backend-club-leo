import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'

import gendersController from '../controllers/genders'
import gendersValidator from '../utils/validator/genders'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const genders = await gendersController.listGenders()
    res.status(200).json(genders)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting genders' })
  }
})

router.post('/', gendersValidator.validateCreateGenders, async (req: Request, res: Response): Promise<void> => {
  try {
    const newGender = await gendersController.createGenders(req)
    res.status(201).json(newGender)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating gender' })
  }
})

export default router
