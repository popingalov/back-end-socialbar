export default function addLacks({ favorite, ingredientList }) {
  const list = ingredientList.list.map((one) => {
    return one.title;
  });
  favorite.cocktails.forEach((cock, idx) => {
    cock.favorite = true;
    cock.ingredients.forEach((el) => {
      if (!list.includes(el.data.title)) {
        favorite.cocktails[idx].lacks.push(el.data.title);
      }
      el.data = el.data._id;
    });
  });

  return favorite;
}
