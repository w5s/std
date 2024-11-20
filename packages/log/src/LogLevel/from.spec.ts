import { describe, expect, it } from 'vitest';
import { from } from './from.js';
import { LogLevelValue } from './LogLevelValue.js';

describe(from, () => {
  it.each([
    { value: 'critical' as const, level: LogLevelValue.Critical },
    { value: 'error' as const, level: LogLevelValue.Error },
    { value: 'warning' as const, level: LogLevelValue.Warning },
    { value: 'info' as const, level: LogLevelValue.Info },
    { value: 'debug' as const, level: LogLevelValue.Debug },
  ])('returns a $value when given $level', ({ level, value }) => {
    expect(from(value)).toEqual(level);
  });
});
