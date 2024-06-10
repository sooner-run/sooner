export const truncate = (str: string, maxLength: number) =>
  str.length > maxLength ? "..." + str.slice(-maxLength) : str;
