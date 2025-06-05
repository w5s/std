import { describe } from 'vitest';
import { describeIndexable } from '../Testing.js';
import { CharIndexable } from './CharIndexable.js';
import { Char } from '../Char.js';

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
