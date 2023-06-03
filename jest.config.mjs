/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  testMatch: ['**/test/**/*.test.mjs'],

  // A map from regular expressions to paths to transformers
  // transform: undefined,
  transform: {
    '^.+\\.jsx$': 'babel-jest',
  },

  // https://jestjs.io/docs/next/configuration#extensionstotreatasesm-arraystring
  extensionsToTreatAsEsm: ['.jsx'],
};
