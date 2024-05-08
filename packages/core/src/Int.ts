import { Int as IntType } from './Type/Int.js';
import type { Tag } from './Tag.js';
import { IntBounded } from './Int/IntBounded.js';
import { IntComparable } from './Int/IntComparable.js';
import { format } from './Int/format.js';
import { parse } from './Int/parse.js';
import { from } from './Int/from.js';
import { IntNumeric } from './Int/IntNumeric.js';

/**
 * Integer value
 */
export type Int = number & Tag<'Int'>;

/**
 * A collection of functions to manipulate integer values
 *
 * @namespace
 */
export const Int = Object.assign(IntType, {
  ...IntComparable,
  ...IntBounded,
  ...IntNumeric,
  format,
  parse,
  from,
});
