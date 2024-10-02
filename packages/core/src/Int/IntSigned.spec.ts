import { describe, it, expect } from 'vitest';
import { describeSigned } from '../Testing.js';
import { IntSigned } from './IntSigned.js';
import { IntComparable } from './IntComparable.js';

describe('IntNumeric', () => {
  describeSigned({ describe, it, expect })(
    { ...IntComparable, ...IntSigned },
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
    },
  );
});
