import { Indexable } from '@w5s/core/dist/Indexable.js';

export const BigIntIndexable: Indexable<bigint, bigint> = Indexable({
  indexType: 'bigint',
  at: (index) => index,
  indexOf: (value) => value,
});
