module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
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
        ul: ['list'],
        ol: ['list'],
      },
    ],
  },
};
