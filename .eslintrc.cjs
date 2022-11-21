module.exports = {
  //parser: '@babel/eslint-parser',
  env: {
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
