import colors from "../colors.json";

const languageColors = Object.fromEntries(
  Object.entries(colors).map(([key, value]) => [key.toLowerCase(), value])
);

export const getColorForLanguage = (language: string) => {
  const lowerCaseLanguage = language.toLowerCase();
  if (languageColors[lowerCaseLanguage]) {
    return languageColors[lowerCaseLanguage].color;
  }
  return "#000000";
};
