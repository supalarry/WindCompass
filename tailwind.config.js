module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-dark-app': '#1B2845',
        'blue-light-app': '#72a6fa',
        'white-app': '#FFFFFE',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
