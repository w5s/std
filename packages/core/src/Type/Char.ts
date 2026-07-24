import type { Tag } from '../Tag.js';

import { Symbol } from '../Symbol.js';
import { define } from '../Tag/define.js';

export type Char = string & Tag<'Char'>;

/**
 * Char is a string of length 1
 *
 * @namespace
 */
export const Char = define<string, Char>({
  hasInstance: (anyValue) => typeof anyValue === 'string' && anyValue.length === 1,
  [Symbol.schema]: () => ({
    maxLength: 1,
    minLength: 1,
    type: 'string',
  }),
  typeName: 'Char',
});
