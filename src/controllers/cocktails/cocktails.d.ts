interface RootObject {
  _id: string;
  name: string;
  description: string;
  image: string;
  favorite: boolean;
  isMine: boolean;
  cocType: string[];
  cocMetod: string;
  ingredients: Ingredient[];
  glass: string;
}

interface Ingredient {
  ing: Ing;
  size: string;
  alternative: Alternative[];
  optional: boolean;
  dressing: boolean;
  sizeType: string;
  _id: string;
}

interface Alternative {
  _id: string;
  name: string;
}

interface Ing {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  available: boolean;
  shop: boolean;
}
