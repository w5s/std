import { describe } from 'vitest';
import { describeZero } from '@w5s/core/dist/Testing.js';
import { TimeDurationZero } from './TimeDurationZero.js';

describe('TimeDurationZero', () => {
  describeZero(TimeDurationZero, {
    nonZero: () => [1, 2, -1],
  });
});
