import { describe, it, expect } from 'vitest';
import { LogLevelAsInt } from './LogLevelAsInt.js';
import { LogLevelValue } from './LogLevelValue.js';

describe('LogLevelAsInt', () => {
  it.each([
    [LogLevelValue.Critical, 50],
    [LogLevelValue.Error, 40],
    [LogLevelValue.Warn, 30],
    [LogLevelValue.Info, 20],
    [LogLevelValue.Debug, 10],
  ])(`should return value for %s`, (level, expectedValue) => {
    expect(LogLevelAsInt.asInt(level)).toBe(expectedValue);
  });
});
