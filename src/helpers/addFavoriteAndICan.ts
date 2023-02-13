export default function (cocktail, ingredients, favorite) {
  const lang = 'en';
  // !

  let helper = cocktail[lang].ingredients.length;

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
    }
    return acc;
  }, 0);

  if (include === helper) {
    cocktail[lang].iCan = true;
  }

  return cocktail[lang];
}
