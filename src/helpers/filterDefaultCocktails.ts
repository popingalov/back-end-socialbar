export default function (cocktails, ingredients) {
  return cocktails.reduce(
    (acc, cocktail) => {
      let helper = cocktail.ingredients.length;

      const include = cocktail.ingredients.reduce((acc, el) => {
        if (!el.data) {
          return acc;
        }
        if (ingredients.list.includes(el.data._id)) {
          acc += 1;
        }
        return acc;
      }, 0);
      acc.all.push(cocktail);
      if (include === helper) {
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
