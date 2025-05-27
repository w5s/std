import { Symbol } from '../Symbol.js';
import type { Tag } from '../Tag.js';
import { define } from '../Tag/define.js';

/**
 * Integer value
 */
export type Int = number & Tag<'Int'>;

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
