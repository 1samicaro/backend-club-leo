import { body, param } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateUsers = [
  body('name', 'Name not valid')
    .exists()
    .isArray({ min: 1, max: 4 }),
  body('documentNumber', 'DocumentNumber not valid')
    .exists()
    .isString()
    .isInt()
    .isLength({ min: 3, max: 15 })
    .trim()
    .escape(),
  body('email', 'Email not valid')
    .exists()
    .isEmail()
    .normalizeEmail(),
  body('phone', 'Phone not valid')
    .exists()
    .isString()
    .isInt()
    .isLength({ min: 6, max: 15 })
    .trim()
    .escape(),
  body('password', 'Password not valid')
    .exists()
    .isString()
    .isStrongPassword()
    .trim()
    .escape(),
  body('birthDate', 'BirthDate not valid')
    .exists()
    .isString()
    .isDate()
    .toDate(),
  body('documentTypeId', 'DocumentTypeId not valid')
    .exists()
    .isInt()
    .toInt(),
  body('roleId', 'RoleId not valid')
    .exists()
    .isInt()
    .toInt(),
  body('countryId', 'CountryId not valid')
    .exists()
    .isInt()
    .toInt(),
  body('cityId', 'CityId not valid')
    .exists()
    .isInt()
    .toInt(),
  body('personTypeId', 'PersonTypeId not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const validateUserInfo = [
  param('id', 'Id not valid')
    .exists()
    .isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const usersValidator = { validateCreateUsers, validateUserInfo }

export default usersValidator
