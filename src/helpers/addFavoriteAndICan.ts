export default function (cocktail, ingredients, favorite) {
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
    if (ingredients.list.includes(el.data.id)) {
      acc += 1;
    }
    return acc;
  }, 0);

  if (include === helper) {
    cocktail.iCan = true;
  }

  return cocktail;
}
