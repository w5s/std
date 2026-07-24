import { describeBounded } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { TimeBounded } from './TimeBounded.js';

describe('TimeBounded', () => {
  describeBounded(TimeBounded, {
    maxValue: 8.64e15,
    minValue: -8.64e15,
  });
});
