import { defaultDict } from './defaultRating';
import sumRatings from './sumRaiting';

const ratingUpdateCalculation = (responseData, oldRating, newRating) => {
  const { one, two, three, four, five, total } = responseData.ratings;

  const oldData = responseData.ratings[defaultDict[oldRating]];
  const requestOldRating =
    oldData > 0
      ? { [defaultDict[oldRating]]: oldData - 1 }
      : { [defaultDict[oldRating]]: oldData };

  const newData = responseData.ratings[defaultDict[newRating]];
  const requestNewRating = { [defaultDict[newRating]]: newData + 1 };

  const updateData = {
    one,
    two,
    three,
    four,
    five,
    ...requestOldRating,
    ...requestNewRating,
  };
  const countValue = {
    total: total > 0 ? total : total + 1,
    average: sumRatings(updateData, total, newRating),
  };

  return {
    updateData,
    countValue,
  };
};

export default ratingUpdateCalculation;
