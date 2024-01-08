import { body, param } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateRoles = [
  body('name', 'Name not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 40 })
    .trim()
    .escape(),
  body('permissions', 'Permissions not valid')
    .exists()
    .isArray(),
  body('isPossibleToCreate', 'isPossibleToCreate not valid')
    .exists()
    .isBoolean()
    .toBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const validateRoleInfo = [
  param('id', 'Id not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const rolesValidator = { validateCreateRoles, validateRoleInfo }

export default rolesValidator
