import { Ingredient } from 'src/domain/ingredients/schema/ingredients.schema';

export default function filterShopingIngredientList({
  ingredients,
  shopingList,
  ingredientList,
  all,
  lang = 'en',
}) {
  return ingredients.map((el: Ingredient) => {
    el[lang].shopping = shopingList.ingredients.includes(el[lang].id);
    const cocktailList: string[] = all.reduce((acc, cocktail) => {
      const result = cocktail.ingredients.reduce((acc, { data }) => {
        if (!data) return acc;

        if (data.title === el[lang].title) {
          acc.push(cocktail.title);
        }
        return acc;
      }, []);
      if (result.length > 0) {
        acc.push(...result);
      }
      return acc;
    }, [] as string[]);

    el[lang].cocktails.push(...cocktailList);
    el[lang].iHave = ingredientList.list.includes(el[lang].id);
    return el;
  });
}
