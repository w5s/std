import { Int as IntType } from '@w5s/core/dist/Type/Int.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import { IntBounded } from './Int/IntBounded.js';
import { IntComparable } from './Int/IntComparable.js';
import { format } from './Int/format.js';
import { parse } from './Int/parse.js';
import { fromNumber } from './Int/fromNumber.js';
import { IntNumeric } from './Int/IntNumeric.js';
import { IntSigned } from './Int/IntSigned.js';
import { IntIndexable } from './Int/IntIndexable.js';
import { IntNegate } from './Int/IntNegate.js';
import { IntZero } from './Int/IntZero.js';

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
  ...IntIndexable,
  ...IntBounded,
  ...IntNegate,
  ...IntNumeric,
  ...IntSigned,
  ...IntZero,
  format,
  parse,
  fromNumber,
});
