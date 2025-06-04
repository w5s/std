import { describe } from 'vitest';
import { describeBounded } from '@w5s/core/dist/Testing.js';
import { TimeBounded } from './TimeBounded.js';

describe('TimeBounded', () => {
  describeBounded(TimeBounded, {
    minValue: -8.64e15,
    maxValue: 8.64e15,
  });
});
