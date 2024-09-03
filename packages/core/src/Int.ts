import { Int as IntType } from './Type/Int.js';
import { IntBounded } from './Int/IntBounded.js';
import { IntComparable } from './Int/IntComparable.js';
import { format } from './Int/format.js';
import { parse } from './Int/parse.js';
import { fromNumber } from './Int/fromNumber.js';
import { IntNumeric } from './Int/IntNumeric.js';
import { IntSigned } from './Int/IntSigned.js';
import { Callable } from './Callable.js';

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
export const Int = Callable({
  ...IntType,
  ...IntComparable,
  ...IntBounded,
  ...IntNumeric,
  ...IntSigned,
  format,
  parse,
  fromNumber,
});
