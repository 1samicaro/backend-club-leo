import type { Request } from 'express'

import additionalTypesServices from '../services/additionalTypes'
import type { AdditionalType } from '../types/additionalTypes'

const listAdditionalTypes = async (req: Request): Promise<AdditionalType[]> => {
  const { PersonTypeId } = req.query
  const additionalTypes = await additionalTypesServices.getAdditionalTypes(PersonTypeId as string)
  return additionalTypes
}

const createAdditionalType = async (req: Request): Promise<AdditionalType> => {
  const additionalType = req.body

  const newAdditionalType = await additionalTypesServices.postAdditionalType(additionalType)

  return newAdditionalType
}

const additionalTypesController = { createAdditionalType, listAdditionalTypes }

export default additionalTypesController
