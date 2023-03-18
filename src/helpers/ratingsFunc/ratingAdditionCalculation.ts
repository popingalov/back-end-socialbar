import { defaultDict } from './defaultRating';
import sumRatings from './sumRaiting';

const ratingAdditionCalculation = (responseData, rating) => {
  const { one, two, three, four, five, total } = responseData.en.ratings;

  const value = responseData.en.ratings[defaultDict[rating]];
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
