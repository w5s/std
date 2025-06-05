import { describe } from 'vitest';
import { describeSigned } from '../Testing.js';
import { IntSigned } from './IntSigned.js';
import { IntComparable } from './IntComparable.js';

describe('IntNumeric', () => {
  describeSigned(
    { ...IntComparable, ...IntSigned },
    {
      values: () => [
        { value: -2, type: 'negative', sign: -1, abs: 2 },
        { value: -1, type: 'negative', sign: -1, abs: 1 },
        { value: 0, type: 'zero', sign: 0, abs: 0 },
        { value: 1, type: 'positive', sign: 1, abs: 1 },
        { value: 2, type: 'positive', sign: 1, abs: 2 },
      ],
    },
  );
});
