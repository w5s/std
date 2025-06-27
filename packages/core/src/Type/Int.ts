import type { Int as CoreInt } from '@w5s/core-type';
import { Symbol } from '../Symbol.js';
import { define } from '../Tag/define.js';

/**
 * Integer value
 *
 * Alias to {@link CoreInt | Int}
 */
export type Int = CoreInt;

/**
 * Int Type and Codec definition
 *
 * @namespace
 */
export const Int = define<number, Int>({
  typeName: 'Int',
  hasInstance: (anyValue) => Number.isSafeInteger(anyValue),
  [Symbol.schema]: () => ({
    type: 'integer',
  }),
});
