import { Indexable } from '../Indexable.js';

export const CharIndexable = Indexable({
  at: (index) => String.fromCodePoint(index),
  indexOf: (value) => value.codePointAt(0),
});
