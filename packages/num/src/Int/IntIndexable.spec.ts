import { describe } from 'vitest';
import { describeIndexable } from '@w5s/core/dist/Testing.js';
import { IntIndexable } from './IntIndexable.js';
import { Int } from '../Int.js';

describe('IntIndexable', () => {
  describeIndexable(IntIndexable, {
    index: [
      [Int(0), Int(0)],
      [Int(1), Int(1)],
    ],
    range: [
      [Int(0), Int(2), [Int(0), Int(1), Int(2)]],
      [Int(1), Int(4), [Int(1), Int(2), Int(3), Int(4)]],
    ],
  });
});
