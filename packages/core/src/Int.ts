import { Int as IntType } from './Type/Int.js';
import { IntBounded } from './Int/IntBounded.js';
import { IntComparable } from './Int/IntComparable.js';
import { format } from './Int/format.js';
import { parse } from './Int/parse.js';
import { from } from './Int/from.js';
import { IntNumeric } from './Int/IntNumeric.js';

/**
 * Integer value
 *
 * Alias of {@link @w5s/core!Type.Int}
 */
export type Int = IntType;

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
