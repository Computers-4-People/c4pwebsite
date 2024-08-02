/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
    },
    fontFamily: {
      'sans': 'Roboto',
      'title': '"Bebas Neue"'
    },
    transitionProperty: {
      'grid': 'grid'
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

