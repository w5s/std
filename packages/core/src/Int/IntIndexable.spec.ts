import { describe, it, expect } from 'vitest';
import { describeIndexable } from '../Testing.js';
import { IntIndexable } from './IntIndexable.js';
import { Int } from '../Int.js';

describe('IntIndexable', () => {
  describeIndexable({ describe, it, expect })(IntIndexable, {
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
