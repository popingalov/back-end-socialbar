import { Ingredient } from 'src/domain/ingredients/schema/ingredients.schema';

export default function filterShopingIngredientList({
  ingredients,
  shopingList,
  ingredientList,
  all,
  lang = 'en',
}) {
  return ingredients.map((eld: Ingredient) => {
    const el = eld[lang];

    el.shopping = shopingList.ingredients.includes(el.id);
    const cocktailList: string[] = all.reduce((acc, cocktail) => {
      const result = cocktail.ingredients.reduce((acc, { data }) => {
        if (!data) return acc;
        if (data.title === el.title) {
          acc.push(cocktail.title);
        }
        return acc;
      }, []);
      if (result.length > 0) {
        acc.push(...result);
      }
      return acc;
    }, [] as string[]);

    el.cocktails.push(...cocktailList);
    el.iHave = ingredientList.list.includes(el.id);
    return el;
  });
}
