import { describe, it, expect } from 'vitest';
import { LogLevel } from './LogLevel.js';
import { LogLevelBounded } from './LogLevel/LogLevelBounded.js';
import { LogLevelComparable } from './LogLevel/LogLevelComparable.js';
import { LogLevelValue } from './LogLevel/LogLevelValue.js';
import { of } from './LogLevel/of.js';
import { match } from './LogLevel/match.js';

describe('LogLevel', () => {
  it('is an alias to functions', () => {
    expect(LogLevel).toEqual(expect.objectContaining(LogLevelBounded));
    expect(LogLevel).toEqual(expect.objectContaining(LogLevelComparable));
    expect(LogLevel).toEqual(expect.objectContaining(LogLevelValue));
    expect(LogLevel).toEqual(
      expect.objectContaining({
        of,
        match,
      }),
    );
  });
  describe('.value', () => {
    it.each([
      [LogLevel.Critical, 50],
      [LogLevel.Error, 40],
      [LogLevel.Warn, 30],
      [LogLevel.Info, 20],
      [LogLevel.Debug, 10],
    ])(`should return value for %s`, (level, expectedValue) => {
      expect(LogLevel.value(level)).toBe(expectedValue);
    });
  });
});
