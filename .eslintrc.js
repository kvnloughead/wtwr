module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
      },
    ],
    'no-underscore-dangle': 0,
    'no-nested-ternary': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'jsx-a11y/no-redundant-roles': [
      'error',
      {
        ul: ['list'], // allow  explicit role for lists, due to safari accessibility concerns
        ol: ['list'],
      },
    ],
  },
};
