import { describe, it, expect } from 'vitest';
import { describeBounded } from '@w5s/core/dist/Testing.js';
import { Int } from '@w5s/core';
import { LogLevelBounded } from './LogLevelBounded.js';
import { of } from './of.js';

describe('LogLevelBounded', () => {
  describeBounded({ describe, it, expect })(LogLevelBounded, {
    minValue: of('none', Int(0)),
    maxValue: of('critical', Int(50)),
  });
});
