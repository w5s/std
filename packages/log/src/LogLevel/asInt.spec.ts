import { describe, it, expect } from 'vitest';
import { asInt } from './asInt.js';
import { LogLevelValue } from './LogLevelValue.js';

describe(asInt, () => {
  it.each([
    [LogLevelValue.Critical, 50],
    [LogLevelValue.Error, 40],
    [LogLevelValue.Warn, 30],
    [LogLevelValue.Info, 20],
    [LogLevelValue.Debug, 10],
  ])(`should return value for %s`, (level, expectedValue) => {
    expect(asInt(level)).toBe(expectedValue);
  });
});
