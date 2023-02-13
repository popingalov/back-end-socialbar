import { IMyCocktails } from 'src/domain/cocktails/dto/returnMyCocktails.dto';

export default function (cocktails, ingredients, favorite): IMyCocktails {
  const lang = 'en';
  return cocktails.reduce(
    (acc, cocktail, idx) => {
      let helper = cocktail[lang].ingredients.length;
      console.log('helper', helper);

      //
      const favoriteResult =
        favorite.cocktails.reduce((acc, el) => {
          if (el.id === cocktail[lang].id) acc += 1;
          return acc;
        }, 0) === 1;
      cocktail[lang].favorite = favoriteResult;
      //

      const include = cocktail[lang].ingredients.reduce((acc, el) => {
        if (!el.data) {
          return acc;
        }
        if (ingredients.list.includes(el.data.id)) {
          acc += 1;
          return acc;
        }
        cocktail[lang].lacks.push(el.data.title);
        return acc;
      }, 0);

      const iCanDo = include === helper;

      if (iCanDo) {
        cocktail[lang].iCan = true;
      }
      acc.all.push(cocktail[lang]);
      //
      if (!cocktail.isDefault) {
        if (iCanDo) {
          acc.mine.haveAll.push(cocktail[lang]);
          return acc;
        }

        if (helper - include <= 2) {
          acc.mine.needMore.push(cocktail[lang]);
          return acc;
        }

        acc.mine.other.push(cocktail[lang]);
        return acc;
      }
      //

      if (iCanDo) {
        acc.haveAll.push(cocktail[lang]);
        return acc;
      }

      if (helper - include <= 2) {
        acc.needMore.push(cocktail[lang]);
        return acc;
      }

      acc.other.push(cocktails[lang]);
      return acc;
    },
    {
      haveAll: [],
      needMore: [],
      other: [],
      mine: { haveAll: [], needMore: [], other: [] },
      all: [],
    },
  );
}
