const config = require('./tailwind.config.cjs');

module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: { config },
    autoprefixer: {},
  },
};
