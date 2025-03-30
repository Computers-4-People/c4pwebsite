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
          hover: "#00a33b"
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
  ],
};