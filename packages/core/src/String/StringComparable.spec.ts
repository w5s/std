import { describe } from 'vitest';

import { describeComparable } from '../Testing.js';
import { StringComparable } from './StringComparable.js';

describe('StringComparable', () => {
  describeComparable(StringComparable, {
    equivalent: () => [
      ['', ''],
      ['ab', 'ab'],
    ],
    ordered: () => ['a', 'b', 'c'],
  });
});
