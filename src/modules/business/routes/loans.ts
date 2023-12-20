import { Router, type Request, type Response } from 'express'

import Log from '../../../middlewares/logger'
import passport from 'passport'

import loansController from '../controllers/loans'
// import { authorizeUser } from '../../auth/controllers/roles'

const router = Router()

router.get('/maxLoan', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    console.log('loans')
    const loan = await loansController.getMaxLoanByUser(req)
    console.log(loan)
    res.status(200).json(loan)
  } catch (error) {
    Log.error(error)
    res.status(400).json(error)
  }
})

router.get('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const loans = await loansController.getLoansByUser(req)
    res.status(200).json(loans)
  } catch (error) {
    Log.error(error)
    res.status(400).json(error)
  }
})

router.post('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response): Promise<void> => {
  try {
    const newLoan = await loansController.postLoan(req)
    res.status(201).json(newLoan)
  } catch (error) {
    Log.error(error)
    res.status(400).json(error)
  }
})

router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response): Promise<void> => {
  try {
    const loan = await loansController.approveLoan(req)
    res.status(200).json(loan)
  } catch (error) {
    Log.error(error)
    res.status(400).json(error)
  }
}
)

router.patch('/payLoan/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response): Promise<any> => {
  try {
    const loan = await loansController.payLoan(req)
    res.status(200).json(loan)
  } catch (error) {
    Log.error(error)
    res.status(400).json(error)
  }
})

export default router
