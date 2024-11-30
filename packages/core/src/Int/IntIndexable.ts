import { Indexable } from '../Indexable.js';
import type { Int } from '../Int.js';

export const IntIndexable = Indexable<Int, Int>({
  indexType: 'number',
  at: (index) => index,
  indexOf: (value) => value,
});
