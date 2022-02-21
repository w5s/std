module.exports = {
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/docs/',
    '/lib/',
    '/build/',
    '/.cache/',
    '/public/',
  ],
  preset: 'es-jest',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/build/',
    '/.cache/',
    '/docs/',
    '/public/',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
