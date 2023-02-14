export default function addLacks({ favorite, ingredientList, lang }) {
  const favorite1 = { ...favorite }._doc;
  const list = ingredientList.list.map((one) => {
    return one.title;
  });
  const helper = favorite1.cocktails.map((cock, idx) => {
    cock = cock[lang];
    if (cock.ingredients.length <= 0) {
      return favorite1;
    }
    cock.ingredients.forEach((el) => {
      el.data = el.data[lang];

      if (!list.includes(el.data[lang].title)) {
        favorite1.cocktails[idx][lang].lacks.push(el.data[lang].title);
      }
      el.data = el.data._id;
    });

    return cock;
  });
  favorite1.cocktails = helper;
  console.log('tyt', helper);

  return favorite1;
}
