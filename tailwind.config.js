/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        c4p: {
          DEFAULT: "#00d64e",
          hover: "#00a33b",
          dark: "#007029",
          darker: "#003d16",
          darkest: "#00280e",
        },
        brand: {
          green: "#00d64e",
          'green-dark': "#00a33b",
          'green-darker': "#007029",
          black: "#001407",
        },
        neutral: {
          50: "#f4f9f6",
          100: "#eef4f1",
          200: "#eaefec",
          300: "#dbe0dd",
        },
        black: "#001407",
        white: "#f4f9f6",
      },
      fontFamily: {
        title: ["Geist Black", "sans-serif"],       // For main titles
        subtitle: ["Geist SemiBold", "sans-serif"], // For subtitles & body text
        paragraph: ["Geist Light", "sans-serif"], 
        quote: ["Geist Mono", "monospace"],        // For quotes
      },
      transitionProperty: {
        grid: "grid",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          /* IE and Edge */
          '-ms-overflow-style': 'none'
        }
      }
      addUtilities(newUtilities)
    }
  ],
};