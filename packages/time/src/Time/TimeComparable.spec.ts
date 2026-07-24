import { describeComparable } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Time } from './Time.js';
import { TimeComparable } from './TimeComparable.js';

describe('TimeComparable', () => {
  describeComparable(TimeComparable, {
    equivalent: () => [
      [Time(0), Time(0)],
      [Time(1), Time(1)],
      [Time(1.1), Time(1.1)],
    ],
    ordered: () => [Time(0), Time(1), Time(2)],
  });
});
