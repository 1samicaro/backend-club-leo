import type { AdditionalType } from '../types/additionalTypes'
import { models } from '../../../database'

const getAdditionalTypes = async (PersonTypeId: string): Promise<AdditionalType[]> => {
  const additionalTypes = await models.AdditionalTypes.findAll({
    where: { PersonTypeId },
    raw: true
  })
  return additionalTypes
}

const postAdditionalType = async (data: AdditionalType): Promise<AdditionalType> => {
  const newAdditionalType = await models.AdditionalTypes.create(data) as AdditionalType

  return newAdditionalType
}

const additionalTypesServices = { postAdditionalType, getAdditionalTypes }

export default additionalTypesServices
