import { describe, it, expect } from 'vitest';
import { describeSigned } from '../Testing.js';
import { BigIntComparable } from './BigIntComparable.js';
import { BigIntSigned } from './BigIntSigned.js';

describe('BigIntSigned', () => {
  describeSigned({ describe, it, expect })(
    {
      ...BigIntComparable,
      ...BigIntSigned,
    },
    {
      abs: [
        { call: [-1n], returns: 1n },
        { call: [0n], returns: 0n },
        { call: [1n], returns: 1n },
      ],
      sign: [
        { call: [-6n], returns: -1n },
        { call: [0n], returns: 0n },
        { call: [6n], returns: 1n },
      ],
    },
  );
});
