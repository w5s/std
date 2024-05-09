import { describe, it, expect } from 'vitest';
import { describeNumeric } from '../testing.js';
import { NumberComparable } from './NumberComparable.js';
import { NumberNumeric } from './NumberNumeric.js';

describe('NumberNumeric', () => {
  describeNumeric({ describe, it, expect })(
    { ...NumberComparable, ...NumberNumeric },
    {
      abs: [
        { call: [-1], returns: 1 },
        { call: [0], returns: 0 },
        { call: [1], returns: 1 },
      ],
      sign: [
        { call: [-6], returns: -1 },
        { call: [0], returns: 0 },
        { call: [6], returns: 1 },
      ],
      '+': [
        { call: [1, 1], returns: 2 },
        { call: [1, -1], returns: 0 },
      ],
      '-': [
        { call: [1, 1], returns: 0 },
        { call: [1, -1], returns: 2 },
      ],
      '*': [
        { call: [1, 1], returns: 1 },
        { call: [2, 3], returns: 6 },
        { call: [3, 2], returns: 6 },
      ],
    }
  );
});
