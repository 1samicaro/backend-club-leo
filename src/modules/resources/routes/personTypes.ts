import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'

import personTypesController from '../controllers/personTypes'
import personTypesValidator from '../utils/validator/personTypes'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const personTypes = await personTypesController.listPersonTypes()
    res.status(200).json(personTypes)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting person types' })
  }
})

router.post('/', personTypesValidator.validateCreatePersonType, async (req: Request, res: Response): Promise<void> => {
  try {
    const newPersonType = await personTypesController.createPersonType(req)
    res.status(201).json(newPersonType)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating person type' })
  }
})

export default router
