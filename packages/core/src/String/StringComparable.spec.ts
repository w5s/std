import { describe } from 'vitest';
import { describeComparable } from '../Testing.js';
import { StringComparable } from './StringComparable.js';

describe('StringComparable', () => {
  describeComparable(StringComparable, {
    ordered: () => ['a', 'b', 'c'],
    equivalent: () => [
      ['', ''],
      ['ab', 'ab'],
    ],
  });
});
