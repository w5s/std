import { describe } from 'vitest';

import { describeComparable } from '../Testing.js';
import { CharComparable } from './CharComparable.js';

describe('CharComparable', () => {
  describeComparable(CharComparable, {
    equivalent: () => [
      ['a', 'a'],
      ['b', 'b'],
    ],
    ordered: () => ['a', 'b', 'c'],
  });
});
