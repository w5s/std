import { Int } from '@w5s/core';
import { describeBounded } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { LogLevelBounded } from './LogLevelBounded.js';
import { of } from './of.js';

describe('LogLevelBounded', () => {
  describeBounded(LogLevelBounded, {
    maxValue: of('critical', Int(50)),
    minValue: of('none', Int(0)),
  });
});
