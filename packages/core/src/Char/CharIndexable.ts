import { Indexable } from '../Indexable.js';
import type { Int } from '../Int.js';

export const CharIndexable = Indexable({
  at: (index) => String.fromCodePoint(index),
  indexOf: (value) => value.codePointAt(0) as Int,
});
