import type { City } from '../types/cities'
import { models } from '../../../database'

const getCityByCountryID = async (CountryId: string): Promise<City[]> => {
  const cities = await models.Cities.findAll({
    where: { CountryId }
  })
  return cities
}

const postCity = async (data: City): Promise<City> => {
  const newCity: City = await models.Cities.create(data)

  return newCity
}

const citiesServices = { postCity, getCityByCountryID }

export default citiesServices
