/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        c4p:{DEFAULT:"#17de43", 
          hover:"#00624b"
        },
      }
    },
    fontFamily: {
      'sans': 'Roboto',
      'title': 'BebasNeueRegular'
    },
    transitionProperty: {
      'grid': 'grid'
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

