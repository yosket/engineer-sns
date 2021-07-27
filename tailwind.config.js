module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Noto Sans JP', 'sans-serif'],
      },
      height: {
        screen: 'calc(var(--vh, 1vh) * 100)',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['first'],
    },
  },
  plugins: [],
}
