import { describe, it, expect } from 'vitest';
import { describeIndexable } from '../Testing.js';
import { CharIndexable } from './CharIndexable.js';
import { Char } from '../Char.js';
import { Int } from '../Int.js';

describe('CharIndexable', () => {
  describeIndexable({ describe, it, expect })(CharIndexable, {
    at: [
      [0, Char('\u0000')],
      [97, Char('a')],
    ],
    indexOf: [
      [Char('\u0000'), Int(0)],
      [Char('a'), Int(97)],
    ],
    rangeSize: [
      [Char('a'), Char('a'), Int(1)],
      [Char('a'), Char('d'), Int(4)],
    ],
    range: [
      [Char('a'), Char('a'), [Char('a')]],
      [Char('a'), Char('c'), [Char('a'), Char('b'), Char('c')]],
    ],
  });
});
