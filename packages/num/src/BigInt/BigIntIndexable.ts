import { Indexable } from '@w5s/core/Indexable';

export const BigIntIndexable: Indexable<bigint, bigint> = Indexable({
  at: (index) => index,
  indexOf: (value) => value,
  indexType: 'bigint',
});
