const ratingSwitcher = (value: number) => {
  switch (value) {
    case 1:
      return { one: 1 };
    case 2:
      return { two: 1 };
    case 3:
      return { three: 1 };
    case 4:
      return { four: 1 };
    case 5:
      return { five: 1 };
    default:
      return;
  }
};

export default ratingSwitcher;
