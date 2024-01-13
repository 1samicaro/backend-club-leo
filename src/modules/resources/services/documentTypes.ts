import type { DocumentType } from '../types/documentTypes'
import { models } from '../../../database'

const getDocumentTypesByPersonTypeAndCountryId = async (CountryId: number, PersonTypeId: number): Promise<DocumentType[]> => {
  const documentTypes = await models.DocumentTypes.findAll({
    where: { CountryId, PersonTypeId }
  })

  return documentTypes
}

const postDocumentType = async (data: DocumentType): Promise<DocumentType> => {
  const newDocumentType: DocumentType = await models.DocumentTypes.create(data)

  return newDocumentType
}

const documentTypesServices = { postDocumentType, getDocumentTypesByPersonTypeAndCountryId }

export default documentTypesServices
