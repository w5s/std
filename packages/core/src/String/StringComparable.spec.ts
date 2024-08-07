import { describe, it, expect } from 'vitest';
import { describeComparable } from '../Testing.js';
import { StringComparable } from './StringComparable.js';

describe('StringComparable', () => {
  describeComparable({ describe, it, expect })(StringComparable, {
    ordered: () => ['a', 'b', 'c'],
    equivalent: () => [
      ['', ''],
      ['ab', 'ab'],
    ],
  });
});
