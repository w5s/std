import { Callable } from './Callable.js';
import { CharBounded } from './Char/CharBounded.js';
import { CharComparable } from './Char/CharComparable.js';
import { CharIndexable } from './Char/CharIndexable.js';
import { fromCodePoint } from './Char/fromCodePoint.js';
import { Char as CharType } from './Type/Char.js';

/**
 * Character value
 *
 * Alias of {@link CharType}
 */
export type Char = CharType;

/**
 * A collection of functions to manipulate characters
 *
 * @namespace
 */
export const Char = Callable({
  ...CharType,
  ...CharComparable,
  ...CharBounded,
  ...CharIndexable,
  fromCodePoint,
});
