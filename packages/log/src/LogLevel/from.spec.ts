import { describe, expect, it } from 'vitest';

import { from } from './from.js';
import { LogLevelValue } from './LogLevelValue.js';

describe(from, () => {
  it.each([
    { level: LogLevelValue.Critical, value: 'critical' as const },
    { level: LogLevelValue.Error, value: 'error' as const },
    { level: LogLevelValue.Warn, value: 'warn' as const },
    { level: LogLevelValue.Info, value: 'info' as const },
    { level: LogLevelValue.Debug, value: 'debug' as const },
  ])('returns a $value when given $level', ({ level, value }) => {
    expect(from(value)).toEqual(level);
  });
});
