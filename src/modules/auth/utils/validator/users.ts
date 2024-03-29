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
    .toDate(),
  body('DocumentTypeId', 'DocumentTypeId not valid')
    .exists()
    .isInt()
    .toInt(),
  body('RoleId', 'RoleId not valid')
    .exists()
    .isInt()
    .toInt(),
  body('CountryId', 'CountryId not valid')
    .exists()
    .isInt()
    .toInt(),
  body('PersonTypeId', 'PersonTypeId not valid')
    .exists()
    .isInt()
    .toInt(),
  body('username', 'Username not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 15 })
    .trim()
    .escape(),
  body('discount', 'Discount not valid')
    .optional(),
  body('Partner', 'Partner not valid')
    .optional()
    .isString()
    .isLength({ max: 15 })
    .trim()
    .escape(),
  body('AdditionalTypeId', 'AdditionalTypeId not valid')
    .optional()
    .isInt()
    .toInt(),
  body('Categories', 'Categories not valid')
    .optional()
    .isArray(),
  body('representName', 'RepresentativeName not valid')
    .optional()
    .isArray({ min: 1, max: 4 }),
  body('representDocumentNumber', 'RepresentativeDocumentNumber not valid')
    .optional()
    .isString()
    .isInt()
    .isLength({ min: 3, max: 15 })
    .trim()
    .escape(),
  body('representEmail', 'RepresentativeEmail not valid')
    .optional()
    .isEmail()
    .normalizeEmail(),
  body('representPhone', 'RepresentativePhone not valid')
    .optional()
    .isString()
    .isInt()
    .isLength({ min: 6, max: 15 })
    .trim()
    .escape(),
  body('docs', 'docs not valid')
    .optional()
    .isArray(),
  body('address', 'Address not valid')
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .trim()
    .escape(),
  body('website', 'Website not valid')
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .trim()
    .escape(),
  body('description', 'Description not valid')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .trim()
    .escape(),
  body('profilePic', 'ProfilePic not valid')
    .optional()
    .isString()
    .trim(),
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

const validateSearchUsers = [
  body('CountryId', 'CountryId not valid')
    .optional()
    .isInt()
    .toInt(),
  body('CityId', 'CityId not valid')
    .optional()
    .isInt()
    .toInt(),
  body('PersonTypeId', 'PersonTypeId not valid')
    .optional()
    .isInt()
    .toInt(),
  body('AdditionalTypeId', 'AdditionalTypeId not valid')
    .optional()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const validateUpdateUsers = [
  body('phone', 'Phone not valid')
    .optional()
    .isString()
    .isInt()
    .isLength({ min: 6, max: 15 })
    .trim()
    .escape(),
  body('password', 'Password not valid')
    .optional()
    .isString()
    .isStrongPassword()
    .trim()
    .escape(),
  body('Categories', 'Categories not valid')
    .optional()
    .isArray(),
  body('representName', 'RepresentativeName not valid')
    .optional()
    .isArray({ min: 1, max: 4 }),
  body('representDocumentNumber', 'RepresentativeDocumentNumber not valid')
    .optional()
    .isString()
    .isInt()
    .isLength({ min: 3, max: 15 })
    .trim()
    .escape(),
  body('representEmail', 'RepresentativeEmail not valid')
    .optional()
    .isEmail()
    .normalizeEmail(),
  body('representPhone', 'RepresentativePhone not valid')
    .optional()
    .isString()
    .isInt()
    .isLength({ min: 6, max: 15 })
    .trim()
    .escape(),
  body('docs', 'docs not valid')
    .optional()
    .isArray(),
  body('address', 'Address not valid')
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .trim()
    .escape(),
  body('website', 'Website not valid')
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .trim()
    .escape(),
  body('discount', 'Discount not valid')
    .optional(),
  body('RoleId', 'RoleId not valid')
    .optional()
    .isInt()
    .toInt(),
  body('CountryId', 'CountryId not valid')
    .optional()
    .isInt()
    .toInt(),
  body('CityId', 'CityId not valid')
    .optional()
    .isInt()
    .toInt(),
  body('description', 'Description not valid')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .trim()
    .escape(),
  body('profilePic', 'ProfilePic not valid')
    .optional()
    .isString()
    .trim(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const usersValidator = { validateCreateUsers, validateUserInfo, validateSearchUsers, validateUpdateUsers }

export default usersValidator
