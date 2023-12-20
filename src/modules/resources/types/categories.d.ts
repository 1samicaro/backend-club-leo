export interface CategoriesModel {
  id: number;
  name: string;
  image: string;
  isService: boolean;
}

export interface Category extends CategoriesModel {}
