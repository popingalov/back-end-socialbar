export interface RootObject {
  ingList: IngList[];
  status: string;
}

export interface IngList {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  available: boolean;
  shop: boolean;
}
