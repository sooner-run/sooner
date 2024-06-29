import colors from "../colors.json";

const languageColors = Object.fromEntries(
  Object.entries(colors).map(([key, value]) => [key, value])
);

export const getColorForLanguage = (language: string) => {
  if (languageColors[language]) {
    return languageColors[language].color;
  }
  return "#000000";
};
