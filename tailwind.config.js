const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      "primary": "#192432",
      "secondary": "#CED0DA",
      "accent": "#DEDEDE",
      "soft": "#F0F0F0"
    },
  },
  plugins: [],
};
