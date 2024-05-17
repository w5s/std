import { describeComparable } from '@w5s/core/dist/testing.js';
import { describe, it, expect } from 'vitest';
import { Time } from './Time.js';
import { TimeComparable } from './TimeComparable.js';

describe('TimeComparable', () => {
  describeComparable({ describe, it, expect })(TimeComparable, {
    ordered: () => [Time(0), Time(1), Time(2)],
    equivalent: () => [
      [Time(0), Time(0)],
      [Time(1), Time(1)],
      [Time(1.1), Time(1.1)],
    ],
  });
});
