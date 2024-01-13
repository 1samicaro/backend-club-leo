import { Router, type Request, type Response } from 'express'
import passport from 'passport'

import Log from '../../../middlewares/logger'

import rolesController, { authorizeUser } from '../controllers/roles'
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

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const isAuthorized = await authorizeUser(req, 'read:roles')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const role = await rolesController.roleInfo(req)
    res.status(200).json(role)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting role' })
  }
})

router.post('/', passport.authenticate('jwt', { session: false }), rolesValidator.validateCreateRoles, async (req: Request, res: Response): Promise<void> => {
  try {
    const isAuthorized = await authorizeUser(req, 'create:roles')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const newRole = await rolesController.createRoles(req)
    res.status(201).json(newRole)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating role' })
  }
})

export default router
