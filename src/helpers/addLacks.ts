export default function addLacks({ favorite, ingredientList }) {
  const list = ingredientList.list.map((one) => {
    return one.title;
  });
  console.log('! D');
  favorite.cocktails.forEach((cock, idx) => {

    console.log(cock);
    if (cock.ua.ingredients.length <= 0) {
      return favorite;
    }
    cock.ua.ingredients.forEach((el) => {
      console.log('ARA');

      if (!list.includes(el.data.title)) {
        favorite.cocktails[idx].lacks.push(el.data.title);
      }
      el.data = el.data._id;
    });
  });

  return favorite;
}
