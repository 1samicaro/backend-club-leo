import type { Request } from 'express'

import citiesServices from '../services/cities'
import type { City } from '../types/cities'

const listCities = async (req: Request): Promise<City[]> => {
  const { CountryId } = req.query
  const cities = await citiesServices.getCityByCountryID(CountryId as string)
  return cities
}

const createCities = async (req: Request): Promise<City> => {
  const newCity = req.body

  const city = await citiesServices.postCity(newCity)

  return city
}

const citiesController = { createCities, listCities }

export default citiesController
