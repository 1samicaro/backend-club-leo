import { validationResult } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import Log from '../../middlewares/logger'

const validator = (req: Request, res: Response, next: NextFunction): any => {
  try {
    validationResult(req).throw()
    next()
  } catch (err: any) {
    Log.warn('Validation error ' + JSON.stringify(err.array()))
    res.status(422)
    res.json(err.array())
  }
}

export default validator
