export default function (cocktails, ingredients) {
  return cocktails.reduce(
    (acc, el) => {
      let helper = el.ingredients.length;

      const include = el.ingredients.reduce((acc, el) => {
        if (ingredients.list.includes(el.data._id)) {
          acc += 1;
        }
        return acc;
      }, 0);

      if (include === helper) {
        acc.ican.push(el);
        return acc;
      }
      if (helper - include <= 2) {
        acc.needMore.push(el);
        return acc;
      }
      acc.other.push(el);
      return acc;
    },
    { ican: [], needMore: [], other: [] },
  );
}
