import { Indexable } from '../Indexable.js';

export const CharIndexable = Indexable({
  indexType: 'number',
  at: (index) => String.fromCodePoint(index),
  indexOf: (value) => value.codePointAt(0),
});
