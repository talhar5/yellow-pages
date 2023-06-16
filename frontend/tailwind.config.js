/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
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

