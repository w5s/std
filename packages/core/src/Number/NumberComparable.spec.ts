import { describe } from 'vitest';
import { describeComparable } from '../Testing.js';
import { NumberComparable } from './NumberComparable.js';

describe('NumberComparable', () => {
  describeComparable(NumberComparable, {
    ordered: () => [-1, 0, 1],
    equivalent: () => [
      [0, 0],
      [1, 1],
      [1.1, 1.1],
    ],
  });
});
