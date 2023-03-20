export default function addLacks({ favorite, ingredientList, lang }) {
  const favorite1 = { ...favorite }._doc;
  const list = ingredientList.list.map((one) => {
    return one.title;
  });
  const helper = favorite.cocktails.reduce((acc, cock, idx) => {
    cock = cock[lang];
    if (cock.ingredients.length <= 0) {
      return favorite;
    }
    cock.ingredients.forEach((el) => {
      el.data = el.data[lang];

      if (!list.includes(el.data[lang].title)) {
        favorite.cocktails[idx][lang].lacks.push(el.data[lang].title);
      }
      el.data = el.data._id;
    });
    acc.push(cock);
    return acc;
  }, []);
  console.log('Lacks1', favorite1);
  console.log('Lacks2', helper);
  favorite1.cocktails = helper;

  return favorite1;
}
