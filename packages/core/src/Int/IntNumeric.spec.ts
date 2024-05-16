import { describe, it, expect } from 'vitest';
import { describeNumeric } from '../testing.js';
import { IntNumeric } from './IntNumeric.js';
// import { IntBounded } from './IntBounded.js';
import { IntComparable } from './IntComparable.js';

describe('IntNumeric', () => {
  // const { minValue, maxValue } = IntBounded;

  describeNumeric({ describe, it, expect })(
    { ...IntComparable, ...IntNumeric },
    {
      '+': [
        { call: [1, 1], returns: 2 },
        { call: [1, -1], returns: 0 },
        // { call: [1, maxValue], returns: maxValue },
      ],
      '-': [
        { call: [1, 1], returns: 0 },
        { call: [1, -1], returns: 2 },
        // { call: [minValue, 1], returns: minValue },
      ],
      '*': [
        { call: [1, 1], returns: 1 },
        { call: [2, 3], returns: 6 },
        { call: [3, 2], returns: 6 },
      ],
    }
  );
});
