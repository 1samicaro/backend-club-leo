import type { Request } from 'express'

import documentTypesServices from '../services/documentTypes'
import type { DocumentType } from '../types/documentTypes'

const listDocumentTypes = async (req: Request): Promise<DocumentType[]> => {
  const CountryId = req.query.CountryId as string
  const PersonTypeId = req.query.PersonTypeId as string

  const documentTypes = await documentTypesServices.getDocumentTypesByPersonTypeAndCountryId(parseInt(CountryId), parseInt(PersonTypeId))

  return documentTypes
}

const createDocumentType = async (req: Request): Promise<DocumentType> => {
  const newDocumentType = req.body
  const documentType = await documentTypesServices.postDocumentType(newDocumentType)
  return documentType
}

const documentTypesController = { createDocumentType, listDocumentTypes }

export default documentTypesController
