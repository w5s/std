import { describe, it, expect } from 'vitest';
import { describeBounded } from '@w5s/core/dist/Testing.js';
import { TimeBounded } from './TimeBounded.js';

describe('TimeBounded', () => {
  describeBounded({ describe, it, expect })(TimeBounded, {
    minValue: -8.64e15,
    maxValue: 8.64e15,
  });
});
