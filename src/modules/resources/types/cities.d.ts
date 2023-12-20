export interface CitiesModel {
  id?: number;
  name: string;
}

export interface City extends CitiesModel {
  CountryId?: number;
}
