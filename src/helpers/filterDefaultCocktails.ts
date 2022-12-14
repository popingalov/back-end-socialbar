import { IDefaultCocktails } from 'src/domain/cocktails/dto/returnDefaultCocktails.dto';

export default function (cocktails, ingredients, favorite): IDefaultCocktails {
  return cocktails.reduce(
    (acc, cocktail, idx) => {
      let helper = cocktail.ingredients.length;

      //

      const favoriteResult =
        favorite.cocktails.reduce((acc, el) => {
          if (el.id === cocktail.id) acc += 1;
          return acc;
        }, 0) === 1;
      cocktail.favorite = favoriteResult;
      //
      const include = cocktail.ingredients.reduce((acc, el) => {
        if (!el.data) {
          return acc;
        }
        if (ingredients.list.includes(el.data._id)) {
          acc += 1;
          return acc;
        }
        cocktail.lacks.push(el.data.title);
        return acc;
      }, 0);

      const iCanDo = include === helper;

      acc.all.push(cocktail);
      if (iCanDo) {
        cocktail.iCan = true;
        acc.haveAll.push(cocktail);
        return acc;
      }

      if (helper - include <= 2) {
        acc.needMore.push(cocktail);
        return acc;
      }
      acc.other.push(cocktail);
      return acc;
    },
    { haveAll: [], needMore: [], other: [], all: [], mine: null },
  );
}
