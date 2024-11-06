import { Indexable } from '../Indexable.js';

export const BigIntIndexable: Indexable<bigint, bigint> = Indexable({
  indexType: 'bigint',
  at: (index) => index,
  indexOf: (value) => value,
});
