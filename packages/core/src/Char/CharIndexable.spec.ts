import { describe } from 'vitest';

import { Char } from '../Char.js';
import { describeIndexable } from '../Testing.js';
import { CharIndexable } from './CharIndexable.js';

describe('CharIndexable', () => {
  describeIndexable(CharIndexable, {
    index: [
      [0, Char('\u0000')],
      [97, Char('a')],
    ],
    range: [
      [Char('a'), Char('a'), [Char('a')]],
      [Char('a'), Char('c'), [Char('a'), Char('b'), Char('c')]],
    ],
  });
});
