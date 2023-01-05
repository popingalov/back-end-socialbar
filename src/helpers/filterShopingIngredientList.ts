export default function ({ ingredients, shopingList, ingredientList }) {
  return ingredients.map((el) => {
    el.shopping = shopingList.ingredients.includes(el.id);

    el.iHave = ingredientList.list.includes(el.id);
    return el;
  });
}
