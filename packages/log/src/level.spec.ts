import { describe, test, expect } from '@jest/globals';
import { LogLevel } from './level.js';

describe(LogLevel, () => {
  describe('()', () => {
    test('should return a new object', () => {
      expect(LogLevel('Test', 3)).toEqual({ logLevelName: 'Test', logLevel: 3 });
    });
  });
  describe.each(['Critical', 'Error', 'Warning', 'Info', 'Debug'] as const)('%s', (name) => {
    test('should have correct value', () => {
      expect(LogLevel[name]).toMatchSnapshot(name);
    });
  });
  describe(LogLevel.value, () => {
    test.each([
      [LogLevel.Critical, 50],
      [LogLevel.Error, 40],
      [LogLevel.Warning, 30],
      [LogLevel.Info, 20],
      [LogLevel.Debug, 10],
    ])(`should return value for %s`, (level, expectedValue) => {
      expect(LogLevel.value(level)).toBe(expectedValue);
    });
  });

  describe(LogLevel.compare, () => {
    test('should return 1 if superior', () => {
      expect(LogLevel.compare(LogLevel.Error, LogLevel.Warning)).toBe(1);
    });

    test('should return 0 if equal', () => {
      expect(LogLevel.compare(LogLevel.Error, LogLevel.Error)).toBe(0);
    });

    test('should return -1 if inferior', () => {
      expect(LogLevel.compare(LogLevel.Warning, LogLevel.Error)).toBe(-1);
    });
  });

  describe(LogLevel.match, () => {
    test('should return undefined if empty cases', () => {
      expect(LogLevel.match([])(LogLevel.Critical)).toBe(undefined);
    });
    test('should return default value if defined', () => {
      expect(LogLevel.match([], 'defaultValue')(LogLevel.Critical)).toBe('defaultValue');
    });
    test('should return value if level exact value is found', () => {
      const matcherFunction = LogLevel.match([
        [LogLevel.Warning, 'foo'],
        [LogLevel.Error, 'bar'],
        [LogLevel.Critical, 'baz'],
      ]);
      expect(matcherFunction(LogLevel.Error)).toBe('bar');
    });
    test('should select first superior or equal matcher', () => {
      const matcherFunction = LogLevel.match([
        [LogLevel.Warning, 'foo'],
        [LogLevel.Error, 'bar'],
        [LogLevel.Critical, 'baz'],
      ]);

      expect(matcherFunction(LogLevel.Error)).toBe('bar');
      expect(matcherFunction(LogLevel.Warning)).toBe('foo');
      expect(matcherFunction(LogLevel.Info)).toBe(undefined);
    });

    test('should return defaultValue if no matcher is fulfilled', () => {
      const matcherFunction = LogLevel.match(
        [
          [LogLevel.Warning, 'foo'],
          [LogLevel.Error, 'bar'],
          [LogLevel.Critical, 'baz'],
        ],
        'defaultValue'
      );
      expect(matcherFunction(LogLevel.Info)).toBe('defaultValue');
    });
  });
});
