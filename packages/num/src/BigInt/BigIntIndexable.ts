import { Indexable } from '@w5s/core/Indexable';

export const BigIntIndexable: Indexable<bigint, bigint> = Indexable({
  indexType: 'bigint',
  at: (index) => index,
  indexOf: (value) => value,
});
