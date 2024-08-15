const { theme } = require("tailwindcss/defaultConfig");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        smallland: "url('landsmall.jpg')",
        land: "url('landbg.jpg')",
      },
      fontFamily: {
        sans: ["Nunito", ...theme.fontFamily.sans],
        mono: ["Edu Australia VIC WA NT Handisfy ", ...theme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
