export const formatCount = (count: number): string => {
  const hours = Math.floor(count / (1000 * 60 * 60));
  const minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0 && minutes === 0) {
    return "0 minutes";
  } else if (hours === 0) {
    return `${minutes} minutes`;
  } else if (minutes === 0) {
    return `${hours} hours`;
  } else {
    return `${hours} hours ${minutes} minutes`;
  }
};
