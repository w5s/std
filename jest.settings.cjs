// @ts-check

/**
 * @type {<T>(value: T[]|T|undefined) => T[]}
 */
function toArray(value) {
  if (value == null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

/**
 * @type {<T>(left: T[]|T|undefined, right:T[]|T|undefined) => T[]}
 */
function concatArray(left, right) {
  return toArray(left).concat(toArray(right));
}

/** @typedef {import('@jest/types').Config.InitialOptions & {}} JestConfig */

/** @type {(...configs: JestConfig[]) => JestConfig} */
function concatJestConfig(...configs) {
  return configs.reduce(
    (/** @type {JestConfig} */ returnValue, /** @type {JestConfig} */ config) => ({
      ...returnValue,
      ...config,
      coveragePathIgnorePatterns: concatArray(
        returnValue.coveragePathIgnorePatterns,
        config.coveragePathIgnorePatterns
      ),
      testPathIgnorePatterns: concatArray(returnValue.testPathIgnorePatterns, config.testPathIgnorePatterns),
    }),
    {}
  );
}

/** @type {(config: JestConfig) => JestConfig} */
function defaultJestConfig(config) {
  return concatJestConfig(
    {
      coveragePathIgnorePatterns: ['/node_modules/', '/docs/', '/lib/', '/build/', '/.cache/', '/public/'],
      preset: 'es-jest',
      testPathIgnorePatterns: ['/node_modules/', '/lib/', '/build/', '/.cache/', '/docs/', '/public/'],
      moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
      },
    },
    config
  );
}

module.exports = {
  concatJestConfig,
  defaultJestConfig,
};
