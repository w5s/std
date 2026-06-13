import { describe } from 'vitest';
import { describeBounded } from '@w5s/core/Testing';
import { Int } from '@w5s/core/Int';
import { LogLevelBounded } from './LogLevelBounded.js';
import { of } from './of.js';

describe('LogLevelBounded', () => {
  describeBounded(LogLevelBounded, {
    minValue: of('none', Int(0)),
    maxValue: of('critical', Int(50)),
  });
});
