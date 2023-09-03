import { describe, it, expect } from 'vitest';
import { LogLevel } from './level.js';

describe('LogLevel', () => {
  describe('.of()', () => {
    it('should return a new object', () => {
      expect(LogLevel.of('Test', 3)).toEqual({
        _: 'LogLevel',
        name: 'Test',
        value: 3,
      });
    });
  });
  describe.each(['Critical', 'Error', 'Warning', 'Info', 'Debug'] as const)('%s', (name) => {
    it('should have correct value', () => {
      expect(LogLevel[name]).toMatchSnapshot(name);
    });
  });
  describe('.value', () => {
    it.each([
      [LogLevel.Critical, 50],
      [LogLevel.Error, 40],
      [LogLevel.Warning, 30],
      [LogLevel.Info, 20],
      [LogLevel.Debug, 10],
    ])(`should return value for %s`, (level, expectedValue) => {
      expect(LogLevel.value(level)).toBe(expectedValue);
    });
  });

  describe('.compare', () => {
    it('should return 1 if superior', () => {
      expect(LogLevel.compare(LogLevel.Error, LogLevel.Warning)).toBe(1);
    });

    it('should return 0 if equal', () => {
      expect(LogLevel.compare(LogLevel.Error, LogLevel.Error)).toBe(0);
    });

    it('should return -1 if inferior', () => {
      expect(LogLevel.compare(LogLevel.Warning, LogLevel.Error)).toBe(-1);
    });
  });

  describe('.match', () => {
    it('should return undefined if empty cases', () => {
      expect(LogLevel.match([])(LogLevel.Critical)).toBe(undefined);
    });
    it('should return default value if defined', () => {
      expect(LogLevel.match([], 'defaultValue')(LogLevel.Critical)).toBe('defaultValue');
    });
    it('should return value if level exact value is found', () => {
      const matcherFunction = LogLevel.match([
        [LogLevel.Warning, 'foo'],
        [LogLevel.Error, 'bar'],
        [LogLevel.Critical, 'baz'],
      ]);
      expect(matcherFunction(LogLevel.Error)).toBe('bar');
    });
    it('should select first superior or equal matcher', () => {
      const matcherFunction = LogLevel.match([
        [LogLevel.Warning, 'foo'],
        [LogLevel.Error, 'bar'],
        [LogLevel.Critical, 'baz'],
      ]);

      expect(matcherFunction(LogLevel.Error)).toBe('bar');
      expect(matcherFunction(LogLevel.Warning)).toBe('foo');
      expect(matcherFunction(LogLevel.Info)).toBe(undefined);
    });

    it('should return defaultValue if no matcher is fulfilled', () => {
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
