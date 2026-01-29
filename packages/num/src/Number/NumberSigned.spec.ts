import { describe } from 'vitest';
import { describeSigned } from '@w5s/core/dist/Testing.js';
import { NumberConversion } from '../NumberConversion.js';
import { NumberSigned } from './NumberSigned.js';

describe('NumberSigned', () => {
  describeSigned(
    { ...NumberConversion.Comparable(), ...NumberSigned },
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
