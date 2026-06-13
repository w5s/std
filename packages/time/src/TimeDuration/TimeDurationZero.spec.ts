import { describeZero } from '@w5s/core/Testing';
import { describe } from 'vitest';

import { TimeDurationZero } from './TimeDurationZero.js';

describe('TimeDurationZero', () => {
  describeZero(TimeDurationZero, {
    nonZero: () => [1, 2, -1],
  });
});
