import { describe, it, expect } from 'vitest';
import { describeAdd, describeMultiply, describeSubtract } from '../Testing.js';
import { BigIntComparable } from './BigIntComparable.js';
import { BigIntNumeric } from './BigIntNumeric.js';

describe('BigIntNumeric', () => {
  describeAdd({ describe, it, expect })(
    {
      ...BigIntComparable,
      ...BigIntNumeric,
    },
    [
      { call: [1n, 1n], returns: 2n },
      { call: [1n, -1n], returns: 0n },
    ],
  );
  describeSubtract({ describe, it, expect })(
    {
      ...BigIntComparable,
      ...BigIntNumeric,
    },
    [
      { call: [1n, 1n], returns: 0n },
      { call: [1n, -1n], returns: 2n },
    ],
  );
  describeMultiply({ describe, it, expect })(
    {
      ...BigIntComparable,
      ...BigIntNumeric,
    },
    [
      { call: [1n, 1n], returns: 1n },
      { call: [2n, 3n], returns: 6n },
      { call: [3n, 2n], returns: 6n },
    ],
  );
});
