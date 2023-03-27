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

    console.log('in Lacks', cock.ingredients);
    cock.ingredients.forEach((el) => {
      if (!el) return;
      console.log('LACKS', el.data);
      //el.data = el.data[lang];
      el.data = el.data;

      if (!list.includes(el.data[lang].title)) {
        favorite.cocktails[idx][lang].lacks.push(el.data[lang].title);
      }
      el.data = el.data._id;
    });
    acc.push(cock);
    return acc;
  }, []);

  if (!favorite1) favorite1.cocktails = helper;
  return favorite1;
}
