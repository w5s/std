import { Indexable } from '@w5s/core/Indexable';
import type { Int } from '../Int.js';

export const IntIndexable = Indexable<Int, Int>({
  indexType: 'number',
  at: (index) => index,
  indexOf: (value) => value,
});
