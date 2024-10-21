import { describe, it, expect } from 'vitest';
import { describeComparable } from '../Testing.js';
import { CharComparable } from './CharComparable.js';

describe('CharComparable', () => {
  describeComparable({ describe, it, expect })(CharComparable, {
    ordered: () => ['a', 'b', 'c'],
    equivalent: () => [
      ['a', 'a'],
      ['b', 'b'],
    ],
  });
});
