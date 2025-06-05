import { describe } from 'vitest';
import { describeComparable } from '../Testing.js';
import { CharComparable } from './CharComparable.js';

describe('CharComparable', () => {
  describeComparable(CharComparable, {
    ordered: () => ['a', 'b', 'c'],
    equivalent: () => [
      ['a', 'a'],
      ['b', 'b'],
    ],
  });
});
