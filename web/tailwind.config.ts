import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#09090b",
        accent: "#6610F2",
        grey: "#1f1f1f",
        "grey-100": "#a3a3a3",
        "grey-200": "#171717",
        "grey-300": "#262626",
        white: "#FAFAFA",
      },
    },
  },
  plugins: [],
} satisfies Config;
