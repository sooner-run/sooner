export const getClassByTime = (count: number): string => {
  const hours = count / (1000 * 60 * 60);

  switch (true) {
    case hours < 1:
      return "color-scale-1";
    case hours >= 1 && hours <= 3:
      return "color-scale-2";
    case hours > 3 && hours <= 8:
      return "color-scale-3";
    case hours > 8 && hours <= 10:
      return "color-scale-4";
    case hours > 10 && hours <= 13:
      return "color-scale-5";
    case hours > 13:
      return "color-scale-5";
    default:
      return "color-scale-0";
  }
};
