/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes:{
        slideDown: {
          '0%': {width: '0px'},
          '50%': {width: '30px'},
          '100%': {width: '60px'},
        }
      }
    },
    screens: {
      'sm': { 'max': '480px' },
      'md': { 'min': '481px', 'max': '768px' }
    }
  },
  corePlugins: {
    container: false
  },
  plugins: [],
}

