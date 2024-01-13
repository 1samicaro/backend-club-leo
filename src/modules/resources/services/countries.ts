import type { Country } from '../types/countries'
import { models } from '../../../database'

const getCountries = async (): Promise<Country[]> => {
  const countries = await models.Countries.findAll()
  return countries
}

const postCountry = async (data: Country): Promise<Country> => {
  const newCountry: Country = await models.Countries.create(data)

  return newCountry
}

const countriesServices = { postCountry, getCountries }

export default countriesServices
