import { defaultDict } from './defaultRating';
import sumRatings from './sumRaiting';

const ratingAdditionCalculation = (responseData, rating) => {
  const { one, two, three, four, five, total } = responseData.ratings;

  const value = responseData.ratings[defaultDict[rating]];
  const ratingRequest = { [defaultDict[rating]]: value + 1 };

  const updateData = { one, two, three, four, five, ...ratingRequest };
  const countValue = {
    total: total + 1,
    average: sumRatings(updateData, total, rating),
  };

  return {
    updateData,
    countValue,
  };
};

export default ratingAdditionCalculation;
