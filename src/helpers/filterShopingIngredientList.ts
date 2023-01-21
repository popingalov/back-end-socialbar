import { Ingredient } from 'src/domain/ingredients/schema/ingredients.schema';

export default function ({ ingredients, shopingList, ingredientList, all }) {
  return ingredients.map((el: Ingredient) => {
    el.shopping = shopingList.ingredients.includes(el.id);
    el.cocktails = all.reduce((acc, cocktail) => {
      const result = cocktail.ingredients.reduce((acc, { data }) => {
        if (data.title === el.title) {
          acc.push(cocktail);
        }
        return acc;
      }, []);
      if (result.length > 0) {
        acc.push(result);
      }
      return acc;
    }, []);
    el.iHave = ingredientList.list.includes(el.id);
    return el;
  });
}
