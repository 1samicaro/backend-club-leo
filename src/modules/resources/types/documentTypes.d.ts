export interface DocumentTypesModel {
  id?: number;
  name: string;
  label: string;
}

export interface DocumentType extends DocumentTypesModel {
  PersonTypeId: number;
  CountryId: number;
}
