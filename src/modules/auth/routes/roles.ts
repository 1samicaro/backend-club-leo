import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'

import rolesController from '../controllers/roles'
import rolesValidator from '../utils/validator/roles'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const roles = await rolesController.listRoles()
    res.status(200).json(roles)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting roles' })
  }
})

router.post('/', rolesValidator.validateCreateRoles, async (req: Request, res: Response): Promise<void> => {
  try {
    const newRole = await rolesController.createRoles(req)
    res.status(201).json(newRole)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating role' })
  }
})

export default router
