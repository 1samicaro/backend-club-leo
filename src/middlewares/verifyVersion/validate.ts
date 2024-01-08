import { header } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../validator'

const validateVersion = [
  header('Version', 'Version not valid')
    .exists()
    .isString()
    .isLength({ min: 5, max: 8 })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

export default validateVersion
