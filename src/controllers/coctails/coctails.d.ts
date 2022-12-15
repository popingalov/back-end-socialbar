export interface RootObject {
  _id: string;
  name: string;
  description: string;
  image: string;
  available: boolean;
  id: string;
  cocType: string[];
  size: Size;
  cocMetod: string;
  ingredients: Ingredient[];
  glass: string;
  [key: string]: string;
}

export interface Ingredient {
  [key: string]: string;
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  available: boolean;
  owner: string;
  size?: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface Size {
  [key: string]: string;
  rom: string;
  cola: string;
}
