import { Indexable } from '@w5s/core/dist/Indexable.js';

export const BigIntIndexable: Indexable<bigint, bigint> = Indexable({
  at: (index) => index,
  indexOf: (value) => value,
  indexType: 'bigint',
});
