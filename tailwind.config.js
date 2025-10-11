/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        emerald: {
          600: '#27ae60',
          700: '#229954',
          800: '#1e8449',
          900: '#145c13',
        },
      },
      fontFamily: {
        'pixel': ['monospace'],
      },
    },
  },
  plugins: [],
};