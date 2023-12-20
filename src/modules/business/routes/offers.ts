import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'
import passport from 'passport'

import offersController from '../controllers/offers'
import { authorizeUser } from '../../auth/controllers/roles'
import offersValidator from '../utils/validator/offers'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const offers = await offersController.listOffers()
    res.status(200).json(offers)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting offers' })
  }
})

router.post('/', passport.authenticate('jwt', { session: false }), offersValidator.validateCreateOffers, async (req: Request, res: Response) => {
  try {
    const isAuthorized = await authorizeUser(req, 'modify:offers')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const offer = await offersController.createOffer(req)
    res.status(201).json(offer)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating offer' })
  }
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), offersValidator.deleteOffer, async (req: Request, res: Response) => {
  try {
    const isAuthorized = await authorizeUser(req, 'modify:offers')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    await offersController.deleteOffer(req)
    res.status(200).json({ message: 'Offer deleted' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error deleting offer' })
  }
})

router.get('/byCity/:CityId', async (req: Request, res: Response) => {
  try {
    const offers = await offersController.listOffersByCity(parseInt(req.params.CityId))
    res.status(200).json(offers)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting offers' })
  }
})

export default router
