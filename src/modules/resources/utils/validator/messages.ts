import { body } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateMessage = [
  body('query', 'Query not valid')
    .exists()
    .isString()
    .trim()
    .escape(),
  body('message', 'Message not valid')
    .exists()
    .isArray()
    .trim()
    .escape(),
  body('user', 'User not valid')
    .exists()
    .isString()
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const messagesValidator = { validateCreateMessage }

export default messagesValidator
