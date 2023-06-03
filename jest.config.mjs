/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // A path to a custom resolver
  // resolver: undefined,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // The test environment that will be used for testing
  // testEnvironment: "jest-environment-node",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  testMatch: [
    "**/test/index.test.mjs"
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jest-circus/runner",

  // A map from regular expressions to paths to transformers
  // transform: undefined,
  transform: {
    // "^.+\\.jsx?$": "esbuild-jest-transform",
    /*
    "^.+\\.jsx?$": [
      'esbuild-jest-transform',
      {
        "format": "esm",
        //"loader": { ".jsx": "jsx" },
        "target": "es6",
      }
    ],
    */
    //"^.+\\.jsx$": "esbuild-jest-transform",

    //'node_modules/express-react-views/index.mjs': '<rootDir>/lib/test/express-react-views-transformer.mjs',
    "^.+\\.jsx$": "babel-jest",
    //"node_modules\\/express-react-views\\/.+\\.mjs": "babel-jest",
    //"node_modules\/express-react-views\/.+\.mjs": "babel-jest",
    //"node_modules/express-react-views/.+\\.mjs": "babel-jest",
  },

  // https://jestjs.io/docs/next/configuration#extensionstotreatasesm-arraystring
  extensionsToTreatAsEsm: ['.jsx'],


  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  /*
  unmockedModulePathPatterns: [
    '<rootDir>\\/node_modules\\/express-react-views',
    '<rootDir>/node_modules/express-react-views',
    '/node_modules/express-react-views'
  ],
  */

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};
