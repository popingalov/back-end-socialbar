import { defaultDict } from './defaultRating';
import sumRatings from './sumRaiting';

const ratingCalculation = (responseData, rating) => {
  const { one, two, three, four, five, total } = responseData.ratings;

  const value = responseData.ratings[defaultDict[rating]];
  const ratingRequest = { [defaultDict[rating]]: value + 1 };

  const oldValue = { one, two, three, four, five, ...ratingRequest };
  const countValue = {
    total: total + 1,
    average: sumRatings(oldValue, total, rating),
  };

  return {
    oldValue,
    countValue,
  };
};

export default ratingCalculation;
