export default function addLacks({ favorite, ingredientList }) {
  const list = ingredientList.list.map((one) => {
    return one.title;
  });
  console.log('! DD');
  favorite.cocktails.forEach((cock, idx) => {
    console.log(cock);
    if (cock.en.ingredients.length <= 0) {
      return favorite;
    }
    cock.en.ingredients.forEach((el) => {
      if (!list.includes(el.data.title)) {
        favorite.cocktails[idx].lacks.push(el.data.title);
      }
      el.data = el.data._id;
    });
  });

  return favorite;
}
