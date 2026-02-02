import { describe, it, expect } from 'vitest';
import { LogLevel } from './LogLevel.js';
import { LogLevelBounded } from './LogLevel/LogLevelBounded.js';
import { LogLevelComparable } from './LogLevel/LogLevelComparable.js';
import { LogLevelValue } from './LogLevel/LogLevelValue.js';
import { of } from './LogLevel/of.js';
import { LogLevelAsString } from './LogLevel/LogLevelAsString.js';
import { LogLevelAsInt } from './LogLevel/LogLevelAsInt.js';

describe('LogLevel', () => {
  it('is an alias to functions', () => {
    expect(LogLevel).toEqual(expect.objectContaining(LogLevelBounded));
    expect(LogLevel).toEqual(expect.objectContaining(LogLevelComparable));
    expect(LogLevel).toEqual(expect.objectContaining(LogLevelValue));
    expect(LogLevel).toEqual(expect.objectContaining(LogLevelAsString));
    expect(LogLevel).toEqual(expect.objectContaining(LogLevelAsInt));
    expect(LogLevel).toEqual(
      expect.objectContaining({
        of,
      }),
    );
  });
});
