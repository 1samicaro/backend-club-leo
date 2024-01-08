import { Router, type Request, type Response } from 'express'
import passport from 'passport'

import Log from '../../../middlewares/logger'

import documentTypesController from '../controllers/documentTypes'
import documentTypesValidator from '../utils/validator/documentTypes'
import { authorizeUser } from '../../auth/controllers/roles'

const router = Router()

router.get('/', documentTypesValidator.validateListDocumentTypes, async (req: Request, res: Response) => {
  try {
    const documentTypes = await documentTypesController.listDocumentTypes(req)
    res.status(200).json(documentTypes)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting document types' })
  }
})

router.post('/', passport.authenticate('jwt', { session: false }), documentTypesValidator.validateCreateDocumentType, async (req: Request, res: Response): Promise<void> => {
  try {
    const isAuthorized = await authorizeUser(req, 'create:resources')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const newDocumentType = await documentTypesController.createDocumentType(req)
    res.status(201).json(newDocumentType)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating document type' })
  }
})

export default router
