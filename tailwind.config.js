module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Noto Sans JP', 'sans-serif'],
      },
      height: {
        screen: 'calc(var(--vh, 1vh) * 100)',
      },
      minHeight: {
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
