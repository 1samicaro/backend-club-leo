import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'
import passport from 'passport'

import transfersController from '../controllers/transfers'
import usersController from '../../auth/controllers/users'

const router = Router()

router.put('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    await transfersController.transfer(req)
    res.status(200).json({ message: 'Transfer complete' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error transferring points' })
  }
})

router.put('/send', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    await transfersController.sendPoints(req)
    res.status(200).json({ message: 'Send complete' })
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error sending points' })
  }
})

router.get('/transactions', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const transactions = await transfersController.listTransactions(req)
    res.status(200).json(transactions)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting transactions' })
  }
})

router.get('/transactions/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const transaction = await transfersController.listTransactionsByUser(req)
    res.status(200).json(transaction)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting transactions' })
  }
})

router.get('/verify/:username', async (req: Request, res: Response) => {
  try {
    const user = await usersController.getUserByUserName(req)
    res.status(200).json(user)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting user' })
  }
})

export default router
