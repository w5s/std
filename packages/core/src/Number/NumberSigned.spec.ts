import { describe, it, expect } from 'vitest';
import { describeSigned } from '../Testing.js';
import { NumberComparable } from './NumberComparable.js';
import { NumberSigned } from './NumberSigned.js';

describe('NumberSigned', () => {
  describeSigned({ describe, it, expect })(
    { ...NumberComparable, ...NumberSigned },
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
