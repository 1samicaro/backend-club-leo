import type { Request } from 'express'

import countriesServices from '../services/countries'
import type { Country } from '../types/countries'

const listCountries = async (): Promise<Country[]> => {
  const countries = await countriesServices.getCountries()
  return countries
}

const createCountries = async (req: Request): Promise<Country> => {
  const newCountry = req.body

  const country = await countriesServices.postCountry(newCountry)

  return country
}

const countriesController = { createCountries, listCountries }

export default countriesController
