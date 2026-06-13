import { describe } from 'vitest';
import { describeBounded } from '@w5s/core/Testing';
import { TimeBounded } from './TimeBounded.js';

describe('TimeBounded', () => {
  describeBounded(TimeBounded, {
    minValue: -8.64e15,
    maxValue: 8.64e15,
  });
});
