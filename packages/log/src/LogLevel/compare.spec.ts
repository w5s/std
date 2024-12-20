import { describe, it, expect } from 'vitest';
import { compare } from './compare.js';
import { LogLevelValue } from './LogLevelValue.js';

describe(compare, () => {
  it('should return 1 if superior', () => {
    expect(compare(LogLevelValue.Error, LogLevelValue.Warn)).toBe(1);
  });

  it('should return 0 if equal', () => {
    expect(compare(LogLevelValue.Error, LogLevelValue.Error)).toBe(0);
  });

  it('should return -1 if inferior', () => {
    expect(compare(LogLevelValue.Warn, LogLevelValue.Error)).toBe(-1);
  });
});
