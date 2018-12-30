// needed for ALE
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['typescript', 'typescript/react', 'typescript/prettier'],
  parser: 'typescript-eslint-parser',
  parserOptions: {},
  plugins: [],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
