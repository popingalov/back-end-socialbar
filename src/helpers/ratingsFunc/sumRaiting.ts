const sumRatings = (data, total, rating): number => {
  let sum = 0;
  let multiplier = 0;
  for (let key in data) {
    multiplier += 1;
    sum += data[key] * multiplier;
  }

  if (sum <= 0) return rating;
  return sum / (total + 1);
};

export default sumRatings;
