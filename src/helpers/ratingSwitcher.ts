export const ratingSwitcher = (value) => {
  switch (value) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    default:
      return;
  }
};

export const ratingWordSwitcher = (point, value) => {
  switch (point) {
    case 'one':
      return { one: value + 1 };
    case 'two':
      return { two: value + 1 };
    case 'three':
      return { three: value + 1 };
    case 'four':
      return { four: value + 1 };
    case 'five':
      return { five: value + 1 };
    default:
      return;
  }
};
