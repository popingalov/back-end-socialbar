export default function addLacks({ favorite, ingredientList, lang }) {
  const list = ingredientList.list.map((one) => {
    return one.title;
  });
  // console.log(favorite.cocktails[0][lang].ingredients[0].data);

  favorite.cocktails.forEach((cock, idx) => {
    cock = cock[lang];
    if (cock.ingredients.length <= 0) {
      return favorite;
    }
    cock.ingredients.forEach((el) => {
      el.data = el.data[lang];
      if (!list.includes(el.data.title)) {
        favorite.cocktails[idx][lang].lacks.push(el.data.title);
      }
      el.data = el.data._id;
    });
  });

  return favorite;
}
